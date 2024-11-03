import { Test, TestingModule } from '@nestjs/testing';
import { TraditionalClothingController } from './traditional-clothing.controller';
import { TraditionalClothingService } from './traditional-clothing.service';

describe('TraditionalClothingController', () => {
  let controller: TraditionalClothingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraditionalClothingController],
      providers: [TraditionalClothingService],
    }).compile();

    controller = module.get<TraditionalClothingController>(TraditionalClothingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
