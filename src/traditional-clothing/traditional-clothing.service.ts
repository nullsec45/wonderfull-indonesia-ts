import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { CreateTraditionalClothingDto } from './dto/create-traditional-clothing.dto';
import { UpdateTraditionalClothingDto } from './dto/update-traditional-clothing.dto';
import { PaginationDTO } from 'dto';
import { Paginate } from 'utils/paginate'
import { PrismaService } from 'services/prisma.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { isRecordNotFound } from 'utils/check-record';


@Injectable()
export class TraditionalClothingService {
  constructor(
    private prisma:PrismaService,
    private readonly fileUploadService:FileUploadService
  ){

  }

  async findByProvinceAndName<T>(params:T){
    try{
      const data=this.prisma.traditionalClothing.findFirst({
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

  async checkTraditionalClothingExists(id:string, type:string){
     const selectData:any={
          image:true
     }

    if(type == 'detail'){
      selectData.province_id=true;
      selectData.name=true;
    }

    try{
        const traditionalClothing = await this.prisma.traditionalClothing.findUnique(
          { 
            select:selectData,
            where: { id } 
          }
        );

         return traditionalClothing
    }catch(error){
        return error;
    }
  }

  async create(createTraditionalClothingDto: CreateTraditionalClothingDto, fileName:string):Promise<ResponseData> {
    try{
      const provinceId = createTraditionalClothingDto.province_id;

      const province = await this.prisma.province.findUnique({
        where: { id: provinceId },
      });

      if (!province) {
        return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
      }

      const findBYProvince= await  this.findByProvinceAndName<string>(createTraditionalClothingDto.province_id);

      if (findBYProvince && findBYProvince.province_id) {
        return responseValue(false,HttpStatus.CONFLICT,'Traditional clothing already exist');
      }

      const findByName = await  this.findByProvinceAndName<string>(createTraditionalClothingDto.name);

      if (findByName  && findBYProvince.name) {
          return responseValue(false,HttpStatus.CONFLICT,'Traditional clothing already exist');
      }

      const traditionalClothing = await this.prisma.traditionalClothing.create({
        data: {
          name: createTraditionalClothingDto.name,
          province: {connect:{id:provinceId}},
          image: fileName
        }
      });

      return responseValueWithData(true,HttpStatus.CREATED, 'Success Created Traditional Clothing.', traditionalClothing);

    }catch(error){
      return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

  async findAll(paginationDTO: PaginationDTO) : Promise<ResponseData> {
      try{
        const {page,skip, take}=new Paginate({...paginationDTO});

        const traditionalClothings = page ? await this.prisma.traditionalClothing.findMany({ take, skip }) : await this.prisma.traditionalClothing.findMany()


        if (traditionalClothings.length <= 0) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Data Traditional Clothing Not Found');
        }

        return responseValueWithData(true, HttpStatus.OK,'Success Get Data Traditional Clothing',traditionalClothings);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async findOne(id: string):Promise<ResponseData> {
    try {
      const traditionalClothing=this.checkTraditionalClothingExists(id, 'detail');

      if (isRecordNotFound(traditionalClothing)) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Clothing Not Found')
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Traditional Clothing',traditionalClothing);
    } catch (error) {
        return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

  async update(id: string, updateTraditionalClothingDto: UpdateTraditionalClothingDto, fileName:string) : Promise<ResponseData> {
      try{
        const traditionalClothing=await this.checkTraditionalClothingExists(id,'update');

        if (isRecordNotFound(traditionalClothing)) {
          await this.fileUploadService.handleFileDelete(fileName);
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Clothing Not Found')
        }

        const province = await this.prisma.province.findUnique({
          where: { id: updateTraditionalClothingDto.province_id },
        });

        if (!province) {
          return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
        }

        const record:any={
            name: updateTraditionalClothingDto.name,
            province: {connect:{id:updateTraditionalClothingDto.province_id}},
        }

        if(fileName !== null){
          record.image=fileName;
          await this.fileUploadService.handleFileDelete(traditionalClothing.image);
        }

        const traditionalClothingUpdate = await this.prisma.traditionalClothing.update({
          where: { id },
          data:record
        });

        return responseValueWithData(true, HttpStatus.OK,'Success Update Traditional Clothing',traditionalClothingUpdate);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async remove(id: string) : Promise<ResponseData> {
    try{
      const traditionalClothing=await this.checkTraditionalClothingExists(id,'delete');

      if (isRecordNotFound(traditionalClothing)) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Clothing Not Found')
      }

      await this.fileUploadService.handleFileDelete(traditionalClothing.image);
      await this.prisma.traditionalClothing.delete({
        where:{id}
      });

      return responseValue(false, HttpStatus.OK, 'Success Delete Traditional Clothing')
    }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }
}
