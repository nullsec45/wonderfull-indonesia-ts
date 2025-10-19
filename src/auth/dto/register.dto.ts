import { IsNotEmpty, IsString, IsEmail,Min, Max, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({
        example: 'Rama Fajar',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(150)
    name:string;

    @ApiProperty({
        example: 'rmfjr45',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    username:string;

    @ApiProperty({
        example:  'fajar@example.com',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        example:  '<SecR3tP@assword>',
        required: true,
    })
    @IsNotEmpty()
    @MinLength(8)
    password:string;

}
