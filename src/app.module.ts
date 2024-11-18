import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TraditionalClothingModule } from './traditional-clothing/traditional-clothing.module';
import { ProvinceService } from './region/province.service';
import { AuthModule } from './auth/auth.module';
import { FileUploadService } from './services/file-upload/file-upload.service';
import { ConfigModule } from '@nestjs/config';
import { TraditionalHouseModule } from './traditional-house/traditional-house.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    TraditionalClothingModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Agar ConfigService bisa diakses di seluruh aplikasi
    }), 
    TraditionalHouseModule
  ],
  controllers: [AppController],
  providers: [AppService, ProvinceService, FileUploadService],
})
export class AppModule {}
