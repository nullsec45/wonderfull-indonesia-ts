import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { CreateTraditionalClothingDto } from './dto/create-traditional-clothing.dto';
import { UpdateTraditionalClothingDto } from './dto/update-traditional-clothing.dto';
import { PaginationDTO } from 'dto';
import { Paginate } from 'utils/paginate'
import { PrismaService } from 'services/prisma.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';


@Injectable()
export class TraditionalClothingService {
  constructor(private prisma:PrismaService){

  }

  async findByProvinceAndName<T>(params:T){
    try{
      return this.prisma.traditionalClothing.findFirst({
        where:  typeof params === "number" ? { province_id: params }: { name: params }
      });
    }catch{
      throw new InternalServerErrorException();
    }
  }

  async create(createTraditionalClothingDto: CreateTraditionalClothingDto, fileName:string):Promise<ResponseData> {
      try{
        const provinceId = Number(createTraditionalClothingDto.province_id);

        const province = await this.prisma.province.findUnique({
          where: { id: provinceId },
        });

        if (!province) {
          return responseValue(false, HttpStatus.BAD_REQUEST, 'Invalid Province ID');
        }

        const findBYProvince= await  this.findByProvinceAndName<number>(createTraditionalClothingDto.province_id);

        if (findBYProvince) {
            return responseValue(false,HttpStatus.CONFLICT,'Traditional clothing already exist');
        }

        const findByName = await  this.findByProvinceAndName<string>(createTraditionalClothingDto.name);

        if (findByName) {
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
          return responseValue(false, HttpStatus.NOT_FOUND, "Data Traditional Clothing Not Found");
        }

        return responseValueWithData(true, HttpStatus.OK,"Success Get Data Tranditional Clothing",traditionalClothings);
      }catch(error){
        return responseValue(false, HttpStatus.CONFLICT, error.message);
      }
  }

  async  findOne(id: number) {
    try {
      const traditionalClothing = await this.prisma.traditionalClothing.findUnique({ where: { id } })

      const isTraditionalClothingNotFound: boolean = [undefined, null].includes(traditionalClothing)
      if (isTraditionalClothingNotFound) {
       return responseValue(false, HttpStatus.NOT_FOUND, 'Traditional Clothing Not Found')
      }

      return responseValueWithData(true, HttpStatus.OK, 'Success Get Traditional Clothing',traditionalClothing);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  update(id: number, updateTraditionalClothingDto: UpdateTraditionalClothingDto) {
    return `This action updates a #${id} traditionalClothing`;
  }

  remove(id: number) {
    return `This action removes a #${id} traditionalClothing`;
  }
}
