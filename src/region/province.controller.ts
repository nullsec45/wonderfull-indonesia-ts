import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Res,
  Query,
  UseGuards
 } from '@nestjs/common';
import { Response } from 'express'
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PaginationDTO } from 'dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { AuthenticationGuard } from 'auth/authenticated.guard';

@Controller('province')
export class ProvinceController {
    constructor(
        private readonly provinceService:ProvinceService
    ){

    }

    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        description:'Request body for post province',
        type:CreateProvinceDto
    })
    @Post()
    @ApiResponse({
    status: 201,
    description: 'Success Create Province.'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request or invalid request.'
    })
    @ApiResponse({
        status: 409,
        description: 'Province already exist.'
    })
    async create(
        @Body() createProvinceDto: CreateProvinceDto,
        @Res() response:Response,
    ) {
        
        const createProvince= await this.provinceService.create(createProvinceDto);
        return response.status(createProvince.statusCode).json(createProvince)
    }
    
    @ApiResponse({
        status: 200,
        description: 'Get all province.'
    })
    @Get()
    async findAll(@Query() paginationDTO: PaginationDTO, @Res() response:Response) {
        const province=await this.provinceService.findAll(paginationDTO);
        return response.status(province.statusCode).json(province);
    }

    @ApiResponse({
        status: 200,
        description: 'Get data province  by id.'
    })
    @Get(':id')
    async findOne(
        @Res() response:Response,
        @Param('id') id: string
    ) {
        const province=await this.provinceService.findOne(id);
        return response.status(province.statusCode).json(province);
    }

    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        description: 'request body for update province.',
        type: UpdateProvinceDto
    })
    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Success Patch Province.'
    })
    @ApiResponse({
        status: 404,
        description: 'Province Not Found.'
    })
    async update(
        @Param('id') id: string, 
        @Body() updateProvinceDto: UpdateProvinceDto,
        @Res() response:Response,
    ) {
        const updateProvince= await this.provinceService.update(id, updateProvinceDto);
        return response.status(updateProvince.statusCode).json(updateProvince);
    }

    @UseGuards(AuthenticationGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Success Delete Province.'
    })
    @ApiResponse({
        status: 404,
        description: 'Province Not Found.'
    })
    async remove(
        @Param('id') id: string, 
        @Res() response:Response
    ) {
        const deleteProvince= await  this.provinceService.remove(id);
        return response.status(deleteProvince.statusCode).json(deleteProvince);
    }
}
