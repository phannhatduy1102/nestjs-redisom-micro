import { Injectable } from '@nestjs/common';
import { ConfigEntity } from '@v2-comic-be/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommonRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>
  ) {}
}
