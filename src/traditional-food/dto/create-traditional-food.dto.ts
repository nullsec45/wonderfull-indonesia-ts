import { IsNotEmpty, IsString } from "class-validator";

export class CreateTraditionalFoodDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    province_id:string;
}
