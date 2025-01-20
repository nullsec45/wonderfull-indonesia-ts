import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
    .setTitle('Wonderfull Indonesia API')
    .setDescription('This is an API about diversity and everything about Indonesia')
    .setVersion('1.0')
    .addTag('wonderfull')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
