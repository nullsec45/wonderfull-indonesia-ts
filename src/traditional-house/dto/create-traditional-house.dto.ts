import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateTraditionalHouseDto {
    @ApiProperty({
        example: 'Rumah Kebaya',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({
        type: 'string',
        format: 'binary', 
        description: 'PNG|JPEG',
        required: true,
        example: 'image.png',
    })
    @IsNotEmpty()
    @IsString()
    file:string;

    @ApiProperty({
        example:  1,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    province_id:string;
}
