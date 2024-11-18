import { Module } from '@nestjs/common';
import { TraditionalHouseService } from './traditional-house.service';
import { TraditionalHouseController } from './traditional-house.controller';
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
          destination:configService.get<string>('PATH_FILE_HOUSE'),
            filename:(req,file,cb) => {
              const filename=`${Date.now()}_${file.originalname}`;
              cb(null, filename);
            }
          })
      })
    })
  ],
  controllers: [TraditionalHouseController],
  providers: [TraditionalHouseService, PrismaService, FileUploadService],
})
export class TraditionalHouseModule {}
