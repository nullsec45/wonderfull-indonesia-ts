import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalHouseService } from './traditional-house.service';

describe('TraditionalHouseService', () => {
  let service: TraditionalHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraditionalHouseService],
    }).compile();

    service = module.get<TraditionalHouseService>(TraditionalHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
