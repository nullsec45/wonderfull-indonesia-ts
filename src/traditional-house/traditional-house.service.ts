import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { CreateTraditionalHouseDto } from './dto/create-traditional-house.dto';
import { UpdateTraditionalHouseDto } from './dto/update-traditional-house.dto';
import { PaginationDTO } from 'dto';
import { Paginate } from 'utils/paginate'
import { PrismaService } from 'services/prisma.service';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';
import { isRecordNotFound } from 'utils/check-record';

@Injectable()
export class TraditionalHouseService {
  constructor(
     private prisma:PrismaService,
     private readonly fileUploadService:FileUploadService
  ){
    
  }

  async findByProvinceAndName<T>(params:T){
     try{
      const data=this.prisma.traditionalHouse.findFirst({
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
  
   async checkTraditionalHouseExists(id:string, type:string){
    const selectData:any={
      image:true
    }

    if(type == 'detail'){
      selectData.province_id=true;
      selectData.name=true;
    }
    try{
        const traditionalHouse = await this.prisma.traditionalHouse.findUnique(
          { 
            select:selectData,
            where: { id } 
          }
        );

         return traditionalHouse
    }catch(error){
        return error;
    }
  }

  async create(
    createTraditionalHouseDto: CreateTraditionalHouseDto,
    fileName:string
  ):Promise<ResponseData> {
      try{
        const provinceId = createTraditionalHouseDto.province_id;

        const province = await this.prisma.province.findUnique({
          where: { id: provinceId },
        });

        if (!province) {
          return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
        }

        const findBYProvince= await  this.findByProvinceAndName<string>(createTraditionalHouseDto.province_id);

        if (findBYProvince && findBYProvince.province_id) {
          return responseValue(false,HttpStatus.CONFLICT,'Traditional House already exist');
        }

        const findByName = await  this.findByProvinceAndName<string>(createTraditionalHouseDto.name);

        if (findByName  && findBYProvince.name) {
            return responseValue(false,HttpStatus.CONFLICT,'Traditional House already exist');
        }

        const traditionalHouse = await this.prisma.traditionalHouse.create({
          data: {
            name: createTraditionalHouseDto.name,
            province: {connect:{id:provinceId}},
            image: fileName
          }
        });

        return responseValueWithData(true,HttpStatus.CREATED, 'Success Created Traditional House.', traditionalHouse);

      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

 async findAll(paginationDTO: PaginationDTO): Promise<ResponseData> {
    try{
      const {page,skip, take}=new Paginate({...paginationDTO});

      const traditionalHouses = page ? await this.prisma.traditionalHouse.findMany({ take, skip }) : await this.prisma.traditionalHouse.findMany()


      if (traditionalHouses.length <= 0) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Data Traditional House Not Found');
      }

      return responseValueWithData(true, HttpStatus.OK,'Success Get Data Traditional House',traditionalHouses);
    }catch(error){
      return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

 async findOne(id: string) : Promise<ResponseData> {
    try {
      const traditionalHouse=await this.checkTraditionalHouseExists(id, 'detail');

      if (isRecordNotFound(traditionalHouse)) {
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional House Not Found')
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Traditional House',traditionalHouse);
    } catch (error) {
        return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }

  async update(id: string, updateTraditionalHouseDto: UpdateTraditionalHouseDto, fileName:string) : Promise<ResponseData> {
    try{
        const traditionalHouse=await this.checkTraditionalHouseExists(id,'update');

        if (isRecordNotFound(traditionalHouse)) {
          await this.fileUploadService.handleFileDelete(fileName);
          return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional House Not Found')
        }

        const province = await this.prisma.province.findUnique({
          where: { id: updateTraditionalHouseDto.province_id },
        });

        if (!province) {
          return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
        }

        const record:any={
            name: updateTraditionalHouseDto.name,
            province: {connect:{id:updateTraditionalHouseDto.province_id}},
        }
        console.log(traditionalHouse.image);

        if(fileName !== null){
          record.image=fileName;
          await this.fileUploadService.handleFileDelete(traditionalHouse.image);
        }

        const traditionalHouseUpdate = await this.prisma.traditionalHouse.update({
          where: { id },
          data:record
        });

        return responseValueWithData(true, HttpStatus.OK,'Success Update Traditional House',traditionalHouseUpdate);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async remove(id: string) : Promise<ResponseData> {
    try{
      const traditionalHouse=await this.checkTraditionalHouseExists(id,'delete');

      if (isRecordNotFound(traditionalHouse)) {
        return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional House Not Found')
      }

      await this.fileUploadService.handleFileDelete(traditionalHouse.image);
      await this.prisma.traditionalHouse.delete({
        where:{id}
      });

      return responseValue(false, HttpStatus.OK, 'Success Delete Traditional House')
    }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
    }
  }
}
