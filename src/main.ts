import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { enviroments } from './common/enviroments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Eduargam API')
    .setDescription('Documentación Eduargam API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // URL API doc
  SwaggerModule.setup('docs', app, document);
  const port = enviroments.PORT;
  await app.listen(port);
  console.log('APP listen on PORT ' + port);
}
bootstrap();
