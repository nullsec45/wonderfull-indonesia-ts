import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseInterceptors, 
  UploadedFile, 
  Res,
  Query
 } from '@nestjs/common';
import { Response } from 'express'
import { TraditionalFoodService } from './traditional-food.service';
import { CreateTraditionalFoodDto } from './dto/create-traditional-food.dto';
import { UpdateTraditionalFoodDto } from './dto/update-traditional-food.dto';
import { PaginationDTO } from 'dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'services/file-upload/file-upload.service';

@Controller('traditional-food')
export class TraditionalFoodController {
  constructor(
    private readonly traditionalFoodService: TraditionalFoodService,
    private readonly fileUploadService : FileUploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTraditionalFoodDto: CreateTraditionalFoodDto,
    @Res() response:Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    const fileData=await this.fileUploadService.handleFileUpload(file);

    if(!fileData.status){
      return response.status(fileData.statusCode).json(fileData);
    }

    const createTraditionalFood= await this.traditionalFoodService.create(createTraditionalFoodDto, fileData.data.data);
    return response.status(createTraditionalFood.statusCode).json(createTraditionalFood)
  }

  @Get()
  async findAll(@Query() paginationDTO: PaginationDTO, @Res() response:Response) {
    const traditionalFoods=await this.traditionalFoodService.findAll(paginationDTO);
    return response.status(traditionalFoods.statusCode).json(traditionalFoods);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traditionalFoodService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string, 
    @Body() updateTraditionalFoodDto: UpdateTraditionalFoodDto,
    @Res() response:Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    let fileData=null;
    if(file){
      fileData=await this.fileUploadService.handleFileUpload(file);

      if(!fileData.status){
        return response.status(fileData.statusCode).json(fileData);
      }

      fileData=fileData.data.data
    }

    const updateTraditionalFood= await this.traditionalFoodService.update(id, updateTraditionalFoodDto, fileData);
    return response.status(updateTraditionalFood.statusCode).json(updateTraditionalFood);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response:Response) {
    const deleteTraditionalFood= await  this.traditionalFoodService.remove(id);
    return response.status(deleteTraditionalFood.statusCode).json(deleteTraditionalFood);
  }
}
