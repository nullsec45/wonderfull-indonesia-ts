import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1')

  if (process.env.APP_ENV !== 'production'){
    const config = new DocumentBuilder()
                      .setTitle('Wonderfull Indonesia API')
                      .setDescription('This is an API about diversity and everything about Indonesia')
                      .setVersion('1.0')
                      .addTag('wonderfull')
                      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs-api', app, documentFactory);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));


  await app.listen(3000);
}
bootstrap();
