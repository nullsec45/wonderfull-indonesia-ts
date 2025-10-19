import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        example: 'rmfjr45 or fajar@example.com',
        required: true,
        description:'Your email or username'
    })
    @IsNotEmpty()
    @IsString()
    username:string;

    @ApiProperty({
        example: '<SecR3tP@assword>',
        required: true,
        description:'Your secret password'
    })
    @IsNotEmpty()
    @IsString()
    password:string;
}
