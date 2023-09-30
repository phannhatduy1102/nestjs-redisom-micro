import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EnsureSlugExist,
  EnsureSlugExistInput,
  GenreEntity,
  StatusEnum,
} from '@v2-comic-be/core';
import { In, Repository } from 'typeorm';

@Injectable()
export class GenreRepository {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>
  ) {}

  async ensureSlugExist(input: EnsureSlugExistInput): Promise<EnsureSlugExist> {
    const result = await this.genreRepository.find({
      select: {
        id: true,
      },
      where: {
        id: In(input.ids),
        status: StatusEnum.Active,
      },
    });
    return {
      isExist: result.length === input.ids.length,
      ids: result.map((item) => item.id),
    };
  }
}
