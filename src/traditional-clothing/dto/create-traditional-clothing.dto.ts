import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateTraditionalClothingDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    province_id:string;
}
