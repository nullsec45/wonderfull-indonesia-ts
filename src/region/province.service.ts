import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PaginationDTO } from 'dto';
import { Paginate } from 'utils/paginate'
import { PrismaService } from 'services/prisma.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { isRecordNotFound } from 'utils/check-record';

@Injectable()
export class ProvinceService {
    constructor(
        private prismaService:PrismaService
    ){

    }

    async checkProvinceExists(name:string){
        try{
            const province = await this.prismaService.province.findFirst(
            { 
                select:{
                    id:true,
                    name:true,
                },
                where: { name } 
            }
            );

            return province
        }catch(error){
            return error;
        }
    }

    async create(
        createProvinceDto:CreateProvinceDto,
    ): Promise<ResponseData>{
        try{
            if (this.checkProvinceExists(createProvinceDto.name)) {
                return responseValue(false,HttpStatus.CONFLICT,'Province already exist');
            }

            const province = await this.prismaService.province.create({
                data: {
                    name: createProvinceDto.name,
                    createdAt:new Date()
                }
            });

            return responseValueWithData(true,HttpStatus.CREATED, 'Success Created Provicne.', province);

        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }

    async findAll(
        paginationDTO:PaginationDTO
    ){
        try{
            const {page, skip,take}=new Paginate({...paginationDTO})

            const provinceData=page ? await this.prismaService.province.findMany({take,skip}) : await this.prismaService.province.findMany()

            if (provinceData.length <= 0){
                return responseValue(false,HttpStatus.NOT_FOUND, 'Data Province Not Found');
            } 

            return responseValueWithData(true, HttpStatus.OK, 'Success Get Data Province', provinceData);
        }catch(error){
            return responseValue(false,HttpStatus.CONFLICT, error.message);
        }
    }

    async findOne(id:string){
        try{
            const provinceData=await this.checkProvinceExists(id);

            if(isRecordNotFound(provinceData)){
                return responseValue(false,HttpStatus.NOT_FOUND, 'Data Province Not Found');
            }

            return responseValueWithData(true, HttpStatus.OK, 'Success Get Data Province',provinceData);
        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }

    async update(
        id:string,
        updateProvinceDto:UpdateProvinceDto
    ){
        try{
            const province=await this.checkProvinceExists(id);

            if (isRecordNotFound(province)) {
                return responseValue(false, HttpStatus.NOT_FOUND, 'Province Not Found')
            }

            const provinceUpdate = await this.prismaService.province.update({
                where: { id },
                data:{
                    name: updateProvinceDto.name,
                    updatedAt:new Date(),
                }
            });

            return responseValueWithData(true, HttpStatus.OK,'Success Update Province',provinceUpdate);
        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }

    async remove(
        id:string
    ){
        try{
            const province=await this.checkProvinceExists(id);
            
          if (isRecordNotFound(province)) {
            return responseValue(false, HttpStatus.NOT_FOUND, 'Province Not Found')
          }

          await this.prismaService.province.delete({
            where:{id}
          });

         return responseValue(false, HttpStatus.OK, 'Success Delete Province')
        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }
}
