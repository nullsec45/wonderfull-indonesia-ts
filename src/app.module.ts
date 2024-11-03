import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TraditionalClothingModule } from './traditional-clothing/traditional-clothing.module';
import { ProvinceService } from './region/province.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, TraditionalClothingModule],
  controllers: [AppController],
  providers: [AppService, ProvinceService],
})
export class AppModule {}
