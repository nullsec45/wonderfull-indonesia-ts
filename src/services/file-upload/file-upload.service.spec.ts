import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';

describe('FileUpload', () => {
  let provider: FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile();

    provider = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
