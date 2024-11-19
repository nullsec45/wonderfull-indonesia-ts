import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalFoodController } from './traditional-food.controller';
import { TraditionalFoodService } from './traditional-food.service';

describe('TraditionalFoodController', () => {
  let controller: TraditionalFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraditionalFoodController],
      providers: [TraditionalFoodService],
    }).compile();

    controller = module.get<TraditionalFoodController>(TraditionalFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
