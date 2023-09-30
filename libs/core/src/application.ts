import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClientProvider, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter, RpcExceptionsFilter } from './modules';

type RunMicroserviceParams = {
  module: unknown;
  provider: ClientProvider;
};

type ApplicationParams = {
  module: unknown;
  port: number;
  swaggerConfig: Omit<OpenAPIObject, 'paths'>;
};

export class Application {
  static initTrackingProcessEvent() {
    return true;
  }

  static async bootstrap(params: ApplicationParams) {
    const app = await NestFactory.create<NestFastifyApplication>(
      params.module,
      new FastifyAdapter({
        logger: false,
      })
    );
    const globalPrefix = '';

    app.setGlobalPrefix(globalPrefix);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        skipUndefinedProperties: false,
        stopAtFirstError: true,
        skipMissingProperties: false,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      })
    );

    app.useGlobalFilters(new AllExceptionsFilter(), new RpcExceptionsFilter());

    const document = SwaggerModule.createDocument(app, params.swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    const port = params.port;
    await app.listen(port);
  }

  static async bootstrapMicroservice(params: RunMicroserviceParams) {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      params.module,
      params.provider
    );

    await app.listen();
  }
}
