import { Injectable } from '@nestjs/common';
import { ConfigEntity } from '@v2-comic-be/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>
  ) {}

  async getList() {
    return await this.configRepository.find();
  }
}
