import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CommonFields,
  CreateWriterInput,
  GetWriterByEmailInput,
  IdFieldInput,
  IdsFieldInput,
  StatusEnum,
  Writer,
  WriterEntity,
  WriterSchema,
  hashPassword,
} from '@v2-comic-be/core';
import { Repository as RedisRepository } from 'redis-om';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WriterRepository {
  constructor(
    @InjectRepository(WriterEntity)
    private readonly writerRepository: Repository<WriterEntity>,
    private dataSource: DataSource,
    @Inject(WriterSchema.repositoryName)
    private readonly redisWriterRepository: RedisRepository
  ) {}

  async getWriterByEmail(input: GetWriterByEmailInput) {
    const writer = await this.redisWriterRepository
      .search()
      .where(CommonFields.Email)
      .equal(input.email)
      .where(CommonFields.Status)
      .equal(StatusEnum.Active)
      .first();

    return writer as Writer;
  }

  async get(input: IdFieldInput) {
    const writer = await this.redisWriterRepository
      .search()
      .where(CommonFields.Id)
      .equal(input.id)
      .where(CommonFields.Status)
      .equal(StatusEnum.Active)
      .first();

    return writer as Writer;
  }

  async create(input: CreateWriterInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const writer = await queryRunner.manager.save(WriterEntity, {
        email: input.email,
        password: await hashPassword(input.password),
      });

      await queryRunner.commitTransaction();

      const redisWriterInput = {
        id: writer.id,
        username: writer.username,
        email: writer.email,
        password: writer.password,
        nickname: writer.nickname,
        name: writer.name,
        avatar: writer.avatar,
        isBanned: writer.isBanned,
        bannedReason: writer.bannedReason,
        phoneNumber: writer.phoneNumber,
        isVerifiedEmail: writer.isVerifiedEmail,
        isVerifiedPhoneNumber: writer.isVerifiedPhoneNumber,
        status: writer.status,
        createdAt: writer.createdAt,
        updatedAt: writer.updatedAt,
      };

      return await this.redisWriterRepository.save(redisWriterInput);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async ensureWritersExist(input: IdsFieldInput) {
    const result = await this.redisWriterRepository
      .search()
      .where(CommonFields.Id)
      .does.containsOneOf(...input.ids)
      .where(CommonFields.Status)
      .equal(StatusEnum.Active)
      .returnAll();

    const ids = result.map((item) => item.id as string);

    return {
      isExist: result.length === input.ids.length,
      ids,
    };
  }
}
