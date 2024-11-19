import { Module } from '@nestjs/common';
import { TraditionalFoodService } from './traditional-food.service';
import { TraditionalFoodController } from './traditional-food.controller';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'services/prisma.service';


@Module({
  imports:[
    ConfigModule,
    MulterModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
          storage:diskStorage({
          destination:configService.get<string>('PATH_FILE_FOOD'),
            filename:(req,file,cb) => {
              const filename=`${Date.now()}_${file.originalname}`;
              cb(null, filename);
            }
          })
      })
    })
  ],
  controllers: [TraditionalFoodController],
  providers: [TraditionalFoodService, PrismaService, FileUploadService],
})
export class TraditionalFoodModule {}
