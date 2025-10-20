import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProvinceDto {
    @ApiProperty({
        example: 'DKI Jakarta',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name:string;
}
