import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'services/prisma.service';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData} from 'utils/response';
import { isRecordNotFound } from 'utils/check-record';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prismaService:PrismaService,
        private jwtService:JwtService,
    ){

    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({where:{email}});
        if (!user) return null;

        const hashed=(user as any).password ?? (user as any).password_hash;
        const oke=await bcrypt.compare(password, hashed);
        if (!oke) return null;

        const {password:_p, password_hash:_ph, ...safeUser} = user as any;
        return safeUser;
    }

    async register(registerDto:RegisterDto):Promise<ResponseData>{
        try{
            const totalUserWithSameEmail=await this.prismaService.user.count({
                where:{
                    email:registerDto.email,
                }
            })

            if (totalUserWithSameEmail > 0) {
                return responseValue(false,HttpStatus.CONFLICT, 'Account already exists');
            }

            const totalUserWithSameUsername=await this.prismaService.user.count({
                where:{
                    email:registerDto.username,
                }
            })

            if (totalUserWithSameUsername > 0) {
                return responseValue(false,HttpStatus.CONFLICT, 'Account already exists');
            }

            registerDto.password=await bcrypt.hash(registerDto.password,10);

            await this.prismaService.user.create({
                data:registerDto
            });

            return responseValue(true, HttpStatus.CREATED, 'Successfully register');
        }catch(error){
            return responseValue(false,HttpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async login(loginDto:LoginDto){
        try{
            let user=await this.prismaService.user.findFirst({
                where:{
                    OR:[
                        {
                            email:loginDto.username,
                        },
                        {
                            username:loginDto.username,
                        }
                    ]
                }
            });

            if(!user){
                return responseValue(false, HttpStatus.UNAUTHORIZED, 'Username or password is invalid');
            }

            const isPaswordValid=await bcrypt.compare(
                loginDto.password,
                user.password,
            );

            if(!isPaswordValid){
                return responseValue(false,HttpStatus.UNAUTHORIZED,'Username or password is invalid');
            }

            let payload={name:user.name}
            let accessToken=this.jwtService.sign(payload,{
                secret:process.env.JWT_SECRET,
                expiresIn:'1h'
            });

            const expiry=new Date(Date.now() + 60 * 60 * 1000);
            const fmt=new Intl.DateTimeFormat('sv-SE',{
                timeZone:'Asia/Jakarta',
                year:'numeric', month:'2-digit', day:'2-digit',
                hour:'2-digit', minute:'2-digit', second:'2-digit',
                hour12:false,
            });

            const jakarta=fmt.format(expiry).replace('', 'T');
            const tokenExpiredAt=`${jakarta}+07:00`;

            const tokenExpiredAtEpoch=Math.floor(Date.now()/1000) + 3600;

            return responseValueWithData(true, HttpStatus.OK, 'Successfully Login.',{
                accessToken:accessToken,
                tokenExpiredAt:tokenExpiredAt,
            });
        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }
}
