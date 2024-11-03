import { Module } from '@nestjs/common';
import { TraditionalClothingService } from './traditional-clothing.service';
import { TraditionalClothingController } from './traditional-clothing.controller';
import { PrismaService } from 'services/prisma.service';

@Module({
  controllers: [TraditionalClothingController],
  providers: [TraditionalClothingService,PrismaService],
})
export class TraditionalClothingModule {}
