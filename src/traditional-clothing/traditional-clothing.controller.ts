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
import { ApiTags, ApiResponse, ApiBody, ApiOperation,ApiConsumes } from '@nestjs/swagger'

@ApiTags('Traditional Clothing')
@Controller('traditional-clothing')
export class TraditionalClothingController {
  constructor(
    private readonly traditionalClothingService: TraditionalClothingService,
    private readonly fileUploadService:FileUploadService
  ) {}

  @ApiBody({
    description: 'request body post traditional clothing.',
    type: CreateTraditionalClothingDto
  })
  @Post()
  @ApiOperation({ summary: 'Submit form with multipart/form-data' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Success Post traditional Cloth.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Province Id.'
  })
  @ApiResponse({
    status: 404,
    description: 'File Not Found.'
  })
  @ApiResponse({
    status: 409,
    description: 'Traditional clothing already exist.'
  })
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

  @ApiResponse({
    status: 200,
    description: 'Get all data traditional clothing.'
  })
  @Get()
  async findAll( @Query() paginationDTO: PaginationDTO, @Res() response:Response) {
    const traditionalClothings=await this.traditionalClothingService.findAll(paginationDTO);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings)
  }

  @ApiResponse({
    status: 200,
    description: 'Get data traditional clothing by id.'
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response:Response) {
    const traditionalClothings= await this.traditionalClothingService.findOne(id);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings);
  }

  @ApiBody({
    description: 'request body update traditional clothing.',
    type: CreateTraditionalClothingDto
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Submit form with multipart/form-data' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Success Patch traditional Cloth.'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Province Id.'
  })
  @ApiResponse({
    status: 404,
    description: 'File Not Found.'
  })
  @ApiResponse({
    status: 409,
    description: 'Traditional clothing already exist.'
  })
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
  @ApiResponse({
    status: 200,
    description: 'Success Delete traditional Cloth.'
  })
  async remove(@Param('id') id: string, @Res() response:Response) {
     const traditionalClothingDelete=await this.traditionalClothingService.remove(id);

     return response.status(traditionalClothingDelete.statusCode).json(traditionalClothingDelete);
  }
}
