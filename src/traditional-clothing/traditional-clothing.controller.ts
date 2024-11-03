import { Controller, Get, Post, Body, Patch, Param, Delete,Query, Res } from '@nestjs/common';
import { Response } from 'express'
import { TraditionalClothingService } from './traditional-clothing.service';
import { CreateTraditionalClothingDto } from './dto/create-traditional-clothing.dto';
import { UpdateTraditionalClothingDto } from './dto/update-traditional-clothing.dto';
import { PaginationDTO } from 'dto';

@Controller('traditional-clothing')
export class TraditionalClothingController {
  constructor(private readonly traditionalClothingService: TraditionalClothingService) {}

  @Post()
 async create(@Body() createTraditionalClothingDto: CreateTraditionalClothingDto, @Res() response:Response) {
    const createTraditionalClothing=await this.traditionalClothingService.create(createTraditionalClothingDto);
    return response.status(createTraditionalClothing.statusCode).json(createTraditionalClothing);
  }

  @Get()
  async findAll( @Query() paginationDTO: PaginationDTO, @Res() response:Response) {
    const traditionalClothings=await this.traditionalClothingService.findAll(paginationDTO);
    return response.status(traditionalClothings.statusCode).json(traditionalClothings)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traditionalClothingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTraditionalClothingDto: UpdateTraditionalClothingDto) {
    return this.traditionalClothingService.update(+id, updateTraditionalClothingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traditionalClothingService.remove(+id);
  }
}
