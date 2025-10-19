import { Controller, Body, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiBody, ApiOperation,ApiConsumes } from '@nestjs/swagger'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
   
  @ApiBody({
      description: 'request body post for register user.',
      type: RegisterDto
  })
  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'Successfully register'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or validation error'
  })
  @ApiResponse({
    status: 409,
    description: 'Account already exists'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async register(
    @Body() registerDto:RegisterDto,
    @Res() response:Response,
  ){
    const result=await this.authService.register(registerDto);

    return response.status(result.statusCode).json(result);
  }

  @ApiBody({
      description: 'request body post for login user.',
      type: LoginDto
  })
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successfully login'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or validation error'
  })
   @ApiResponse({
    status: 409,
    description: 'Username or password is invalid'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async login(
    @Body() loginUserDto:LoginDto,
    @Res() response:Response,
  ){
    const result=await this.authService.login(loginUserDto);
    return response.status(result.statusCode).json(result); 
  }
}

