import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { PrismaService } from 'services/prisma.service';

@Module({
      controllers: [ProvinceController],
      providers: [ProvinceService, PrismaService],
})
export class ProvinceModule {}
