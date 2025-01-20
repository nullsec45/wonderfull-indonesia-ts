import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";



export class CreateTraditionalClothingDto {
    @ApiProperty({
        example: 'Kebaya Encim',
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
        example:  12,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    province_id:string;
}
