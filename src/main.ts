import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  console.log(serverConfig);

  const PORT = process.env.PORT || serverConfig.port;

  await app.listen(PORT);

  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
