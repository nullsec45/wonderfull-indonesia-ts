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
import { TraditionalFoodModule } from './traditional-food/traditional-food.module';
// import { PlatNumberModule } from './plat-number/plat-number.module';
// import { RegionalModule } from './regional/regional.module';
import { JwtService } from '@nestjs/jwt/dist';
import { ProvinceModule } from './region/province.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Agar ConfigService bisa diakses di seluruh aplikasi
    }), 
    // RegionalModule,
    TraditionalClothingModule, 
    TraditionalHouseModule, 
    TraditionalFoodModule, 
    // PlatNumberModule
    ProvinceModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, FileUploadService],
})
export class AppModule {}
