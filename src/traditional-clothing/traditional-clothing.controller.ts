import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query, 
  Res, 
  UseInterceptors, 
  UploadedFile, 
} from '@nestjs/common';
import { Response } from 'express'
import { TraditionalClothingService } from './traditional-clothing.service';
import { CreateTraditionalClothingDto } from './dto/create-traditional-clothing.dto';
import { UpdateTraditionalClothingDto } from './dto/update-traditional-clothing.dto';
import { PaginationDTO } from 'dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'services/file-upload/file-upload.service';


@Controller('traditional-clothing')
export class TraditionalClothingController {
  constructor(
    private readonly traditionalClothingService: TraditionalClothingService,
    private readonly fileUploadService:FileUploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTraditionalClothingDto: CreateTraditionalClothingDto, 
    @Res() response:Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    const fileData=await this.fileUploadService.handleFileUpload(file);

    if(!fileData.status){
      return response.status(fileData.statusCode).json(fileData);
    }

    const createTraditionalClothing=await this.traditionalClothingService.create(createTraditionalClothingDto, fileData.data.data);
    return response.status(createTraditionalClothing.statusCode).json(createTraditionalClothing);
  }

  @Get()
  async findAll( @Query() paginationDTO: PaginationDTO, @Res() response:Response) {
    const traditionalClothings=await this.traditionalClothingService.findAll(paginationDTO);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response:Response) {
    const traditionalClothings= await this.traditionalClothingService.findOne(id);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string, 
    @Body() updateTraditionalClothingDto: UpdateTraditionalClothingDto,
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

    const traditionalClothingUpdate=await this.traditionalClothingService.update(id, updateTraditionalClothingDto, fileData);
    
    return response.status(traditionalClothingUpdate.statusCode).json(traditionalClothingUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response:Response) {
     const traditionalClothingDelete=await this.traditionalClothingService.remove(id);

     return response.status(traditionalClothingDelete.statusCode).json(traditionalClothingDelete);
  }
}
