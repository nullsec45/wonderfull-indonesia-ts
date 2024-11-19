import { PartialType } from '@nestjs/mapped-types';
import { CreateTraditionalFoodDto } from './create-traditional-food.dto';

export class UpdateTraditionalFoodDto extends PartialType(CreateTraditionalFoodDto) {}
