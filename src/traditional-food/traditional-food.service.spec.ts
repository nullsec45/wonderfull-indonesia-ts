import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalFoodService } from './traditional-food.service';

describe('TraditionalFoodService', () => {
  let service: TraditionalFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraditionalFoodService],
    }).compile();

    service = module.get<TraditionalFoodService>(TraditionalFoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
