import { Module } from '@nestjs/common';
import { TraditionalClothingService } from './traditional-clothing.service';
import { TraditionalClothingController } from './traditional-clothing.controller';
import { PrismaService } from 'services/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from 'services/file-upload/file-upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    MulterModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
          storage:diskStorage({
          destination:configService.get<string>('PATH_FILE'),
            filename:(req,file,cb) => {
              const filename=`${Date.now()}_${file.originalname}`;
              cb(null, filename);
            }
          })
      })
    })
  ],
  controllers: [TraditionalClothingController],
  providers: [TraditionalClothingService,PrismaService, FileUploadService],
})
export class TraditionalClothingModule {}
