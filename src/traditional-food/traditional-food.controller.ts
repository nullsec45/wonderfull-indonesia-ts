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
  Query,
  UseGuards
 } from '@nestjs/common';
import { Response } from 'express'
import { TraditionalFoodService } from './traditional-food.service';
import { CreateTraditionalFoodDto } from './dto/create-traditional-food.dto';
import { UpdateTraditionalFoodDto } from './dto/update-traditional-food.dto';
import { PaginationDTO } from 'dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation,ApiConsumes } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import {AuthenticationGuard} from 'auth/authenticated.guard'

@ApiTags('Traditional Food')
@Controller('traditional-food')
export class TraditionalFoodController {
  constructor(
    private readonly traditionalFoodService: TraditionalFoodService,
    private readonly fileUploadService : FileUploadService
  ) {}

  @UseGuards(AuthenticationGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'request body post traditional food.',
    type: CreateTraditionalFoodDto
  })
  @Post()
  @ApiOperation({ summary: 'Submit form with multipart/form-data' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Success Post Traditional Food.'
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
    description: 'Traditional food already exist.'
  })
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

  @ApiResponse({
    status: 200,
    description: 'Get all data traditional house.'
  })
  @Get()
  async findAll(@Query() paginationDTO: PaginationDTO, @Res() response:Response) {
    const traditionalFoods=await this.traditionalFoodService.findAll(paginationDTO);
    return response.status(traditionalFoods.statusCode).json(traditionalFoods);
  }
  @ApiResponse({
    status: 200,
    description: 'Get data traditional house by id.'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traditionalFoodService.findOne(id);
  }

  @UseGuards(AuthenticationGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBody({
      description: 'request body update traditional house.',
      type: CreateTraditionalFoodDto
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Submit form with multipart/form-data' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Success Patch Traditional Food.'
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
    description: 'Traditional food already exist.'
  })
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

  @UseGuards(AuthenticationGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success Delete Traditional Food.'
  })
  async remove(@Param('id') id: string, @Res() response:Response) {
    const deleteTraditionalFood= await  this.traditionalFoodService.remove(id);
    return response.status(deleteTraditionalFood.statusCode).json(deleteTraditionalFood);
  }
}
