import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TraditionalClothingModule } from './traditional-clothing/traditional-clothing.module';
import { ProvinceService } from './region/province.service';
import { AuthModule } from './auth/auth.module';
import { FileUploadService } from './services/file-upload/file-upload.service';

@Module({
  imports: [UserModule, AuthModule, TraditionalClothingModule],
  controllers: [AppController],
  providers: [AppService, ProvinceService, FileUploadService],
})
export class AppModule {}
