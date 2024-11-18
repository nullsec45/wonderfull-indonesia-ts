import { IsNotEmpty, IsString } from 'class-validator';


export class CreateTraditionalHouseDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    province_id:string;
}
