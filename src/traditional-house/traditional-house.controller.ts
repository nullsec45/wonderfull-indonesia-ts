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
  UseGuards 
} from '@nestjs/common';
import { Response } from 'express'
import { TraditionalHouseService } from './traditional-house.service';
import { CreateTraditionalHouseDto } from './dto/create-traditional-house.dto';
import { UpdateTraditionalHouseDto } from './dto/update-traditional-house.dto';
import { PaginationDTO } from 'dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation,ApiConsumes } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import {AuthenticationGuard} from 'auth/authenticated.guard'


@ApiTags('Traditional House')
@Controller('traditional-house')
export class TraditionalHouseController {
    constructor(
      private readonly traditionalHouseService: TraditionalHouseService,
      private readonly fileUploadService: FileUploadService
    ) {}


    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        description: 'request body post traditional house.',
        type: CreateTraditionalHouseDto
    })
    @Post()
    @ApiOperation({ summary: 'Submit form with multipart/form-data' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({
      status: 201,
      description: 'Success Post Traditional House.'
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
      description: 'Traditional house already exist.'
    })
    @UseInterceptors(FileInterceptor('file'))
    async create(
      @Body() createTraditionalHouseDto: CreateTraditionalHouseDto,
      @Res() response:Response,
      @UploadedFile() file: Express.Multer.File
    ) {
      const fileData=await this.fileUploadService.handleFileUpload(file);

      if(!fileData.status){
        return response.status(fileData.statusCode).json(fileData);
      }
      
      const createTraditionalHouse= await this.traditionalHouseService.create(createTraditionalHouseDto, fileData.data.data);
      return response.status(createTraditionalHouse.statusCode).json(createTraditionalHouse);
    }
    
    @ApiResponse({
      status: 200,
      description: 'Get all data traditional house.'
    })
    @Get()
    async findAll(
      @Query() paginationDTO: PaginationDTO, 
      @Res() response:Response
    ) {
      const traditionalHouses=await this.traditionalHouseService.findAll(paginationDTO);

      return response.status(traditionalHouses.statusCode).json(traditionalHouses);
    }

    @ApiResponse({
      status: 200,
      description: 'Get data traditional house by id.'
    })
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response:Response) {
      const traditionalClothings=await this.traditionalHouseService.findOne(id);
      return response.status(traditionalClothings.statusCode).json(traditionalClothings);
    }

    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        description: 'request body update traditional house.',
        type: CreateTraditionalHouseDto
    })
    @Patch(':id')
    @ApiOperation({ summary: 'Submit form with multipart/form-data' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({
      status: 200,
      description: 'Success Patch Traditional House.'
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
      description: 'Traditional house already exist.'
    })
    @UseInterceptors(FileInterceptor('file'))
    async update(
      @Param('id') id: string,
      @Body() updateTraditionalHouseDto: UpdateTraditionalHouseDto,
      @Res() response:Response,
      @UploadedFile() file: Express.Multer.File) 
    {
      let fileData=null;

      if(file){
        fileData=await this.fileUploadService.handleFileUpload(file);

        if(!fileData.status){
          return response.status(fileData.statusCode).json(fileData);
        }

        fileData=fileData.data.data
      }

      const traditionalClothingUpdate=await this.traditionalHouseService.update(id, updateTraditionalHouseDto, fileData);
      
      return response.status(traditionalClothingUpdate.statusCode).json(traditionalClothingUpdate);
    }

    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({
      status: 200,
      description: 'Success Delete traditional Cloth.'
    })
    async remove(
      @Param('id') id: string, 
      @Res() response:Response
    ) {
      const traditionalClothings=await this.traditionalHouseService.remove(id);
      return response.status(traditionalClothings.statusCode).json(traditionalClothings);
    }
}
