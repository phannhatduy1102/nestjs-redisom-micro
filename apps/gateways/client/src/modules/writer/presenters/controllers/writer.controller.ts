import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateWriterInput,
  GatewayCreateWriterInput,
  IdFieldInput,
  WriterClientProviderOptions,
  WriterMessage,
} from '@v2-comic-be/core';

@ApiTags('writer')
@Controller('writer')
export class WriterController {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private readonly writerMicroservices: ClientProxy
  ) {}

  @Get()
  async get(@Query() input: IdFieldInput) {
    return this.writerMicroservices.send<unknown, IdFieldInput>(
      WriterMessage.Get,
      input
    );
  }

  @Post()
  async create(@Body() data: GatewayCreateWriterInput) {
    return this.writerMicroservices.send<unknown, CreateWriterInput>(
      WriterMessage.Create,
      data
    );
  }
}
