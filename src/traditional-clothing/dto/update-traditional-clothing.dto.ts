import { PartialType } from '@nestjs/mapped-types';
import { CreateTraditionalClothingDto } from './create-traditional-clothing.dto';

export class UpdateTraditionalClothingDto extends PartialType(CreateTraditionalClothingDto) {}
