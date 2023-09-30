/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { DocumentBuilder } from '@nestjs/swagger';
import { Application } from '@v2-comic-be/core';
import { AppModule } from './infra/app.module';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Client API Swagger')
  .setDescription('Client API Swagger description')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .setVersion('1.0')
  .addTag('client')
  .build();

Application.bootstrap({
  port: +process.env.CLIENT_GATEWAY_PORT,
  module: AppModule,
  swaggerConfig,
});
