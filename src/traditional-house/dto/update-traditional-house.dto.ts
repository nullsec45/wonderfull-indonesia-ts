import { PartialType } from '@nestjs/mapped-types';
import { CreateTraditionalHouseDto } from './create-traditional-house.dto';

export class UpdateTraditionalHouseDto extends PartialType(CreateTraditionalHouseDto) {}
