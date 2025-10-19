import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { sign } from 'crypto';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaService } from 'services/prisma.service';

@Module({
  imports:[PassportModule.register({session:true}), JwtModule.register(
    {
        secret:process.env.JWT_SECRET,
        signOptions:{
          expiresIn:'1h'
        }
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,PrismaService,SessionSerializer],
})
export class AuthModule {}
