import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalHouseController } from './traditional-house.controller';
import { TraditionalHouseService } from './traditional-house.service';

describe('TraditionalHouseController', () => {
  let controller: TraditionalHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraditionalHouseController],
      providers: [TraditionalHouseService],
    }).compile();

    controller = module.get<TraditionalHouseController>(TraditionalHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
