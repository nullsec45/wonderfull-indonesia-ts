import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateTraditionalClothingDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    province_id:number;

    @IsNotEmpty()
    @IsString()
    image:string;
}
