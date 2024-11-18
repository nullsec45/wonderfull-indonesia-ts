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
  UploadedFile 
} from '@nestjs/common';
import { Response } from 'express'
import { TraditionalHouseService } from './traditional-house.service';
import { CreateTraditionalHouseDto } from './dto/create-traditional-house.dto';
import { UpdateTraditionalHouseDto } from './dto/update-traditional-house.dto';
import { PaginationDTO } from 'dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'services/file-upload/file-upload.service';


@Controller('traditional-house')
export class TraditionalHouseController {
  constructor(
    private readonly traditionalHouseService: TraditionalHouseService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post()
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

  @Get()
  async findAll(
    @Query() paginationDTO: PaginationDTO, 
    @Res() response:Response
  ) {
    const traditionalHouses=await this.traditionalHouseService.findAll(paginationDTO);

    return response.status(traditionalHouses.statusCode).json(traditionalHouses);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response:Response) {
    const traditionalClothings=await this.traditionalHouseService.findOne(id);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings);
  }

  @Patch(':id')
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

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response:Response) {
     const traditionalClothings=await this.traditionalHouseService.remove(id);
     return response.status(traditionalClothings.statusCode).json(traditionalClothings);
  }
}
