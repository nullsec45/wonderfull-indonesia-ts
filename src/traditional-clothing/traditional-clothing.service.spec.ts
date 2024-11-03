import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalClothingService } from './traditional-clothing.service';

describe('TraditionalClothingService', () => {
  let service: TraditionalClothingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraditionalClothingService],
    }).compile();

    service = module.get<TraditionalClothingService>(TraditionalClothingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
