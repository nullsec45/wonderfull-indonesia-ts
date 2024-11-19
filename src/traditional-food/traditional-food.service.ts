import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { CreateTraditionalFoodDto } from './dto/create-traditional-food.dto';
import { UpdateTraditionalFoodDto } from './dto/update-traditional-food.dto';
import { PaginationDTO } from 'dto';
import { Paginate } from 'utils/paginate'
import { PrismaService } from 'services/prisma.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { isRecordNotFound } from 'utils/check-record';

@Injectable()
export class TraditionalFoodService {
  constructor(
    private prisma:PrismaService,
    private readonly fileUploadService:FileUploadService
  ){

  }

  async findByProvinceAndName<T>(params:T){
    try{
      const data=this.prisma.traditionalFood.findFirst({
        select:{
          name:true,
          province_id:true,
        },
        where: {
          OR:[
            {
              province_id:params,
            },
            {
              name:params
            }
          ]
        }
      });

      return data;
    }catch{
      throw new InternalServerErrorException();
    }
  }

  async checkTraditionalFoodExists(id:string, type:string){
     const selectData:any={
          image:true
     }

    if(type == 'detail'){
      selectData.province_id=true;
      selectData.name=true;
    }

    try{
        const traditionalFood = await this.prisma.traditionalFood.findUnique(
          { 
            select:selectData,
            where: { id } 
          }
        );

         return traditionalFood
    }catch(error){
        return error;
    }
  }

  async create(createTraditionalFoodDto: CreateTraditionalFoodDto, fileName:string) : Promise<ResponseData> {
   try{
      const provinceId = createTraditionalFoodDto.province_id;

      const province = await this.prisma.province.findUnique({
        where: { id: provinceId },
      });

      if (!province) {
        return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
      }

      const findBYProvince= await  this.findByProvinceAndName<string>(createTraditionalFoodDto.province_id);


      const findByName = await  this.findByProvinceAndName<string>(createTraditionalFoodDto.name);

      if (findByName  && findBYProvince.name) {
          return responseValue(false,HttpStatus.CONFLICT,'Traditional food already exist');
      }

      const traditionalFood = await this.prisma.traditionalFood.create({
        data: {
          name: createTraditionalFoodDto.name,
          province: {connect:{id:provinceId}},
          image: fileName
        }
      });

      return responseValueWithData(true,HttpStatus.CREATED, 'Success Created Traditional Food.', traditionalFood);

    }catch(error){
      return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

  async findAll(paginationDTO:PaginationDTO) : Promise<ResponseData> {
      try{
        const {page,skip, take}=new Paginate({...paginationDTO});

        const traditionalClothings = page ? await this.prisma.traditionalFood.findMany({ take, skip }) : await this.prisma.traditionalFood.findMany()

        if (traditionalClothings.length <= 0) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Data Traditional Food Not Found');
        }

        return responseValueWithData(true, HttpStatus.OK,'Success Get Data Traditional Food',traditionalClothings);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async findOne(id: string) : Promise<ResponseData> {
    try {
      const traditionalFood=await this.checkTraditionalFoodExists(id, 'detail');

      if (isRecordNotFound(traditionalFood)) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Food Not Found')
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Traditional Food',traditionalFood);
    } catch (error) {
        return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

  async update(id: string, updateTraditionalFoodDto: UpdateTraditionalFoodDto, fileName:string) : Promise<ResponseData> {
     try{
        const traditionalFood=await this.checkTraditionalFoodExists(id,'update');

        if (isRecordNotFound(traditionalFood)) {
          await this.fileUploadService.handleFileDelete(fileName);
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Food Not Found')
        }

        const province = await this.prisma.province.findUnique({
          where: { id: updateTraditionalFoodDto.province_id },
        });

        if (!province) {
          return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
        }

        const record:any={
            name: updateTraditionalFoodDto.name,
            province: {connect:{id:updateTraditionalFoodDto.province_id}},
        }

        if(fileName !== null){
          record.image=fileName;
          await this.fileUploadService.handleFileDelete(traditionalFood.image);
        }

        const traditionalFoodUpdate = await this.prisma.traditionalFood.update({
          where: { id },
          data:record
        });

        return responseValueWithData(true, HttpStatus.OK,'Success Update Traditional Food',traditionalFoodUpdate);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async remove(id: string) {
      try{
          const traditionalFood=await this.checkTraditionalFoodExists(id, 'delete');
            
          if (isRecordNotFound(traditionalFood)) {
            return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Food Not Found')
          }

          await this.fileUploadService.handleFileDelete(traditionalFood.image);
          await this.prisma.traditionalFood.delete({
            where:{id}
          });

         return responseValue(false, HttpStatus.OK, 'Success Delete Traditional Clothing')
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message)
      }
  }
}
