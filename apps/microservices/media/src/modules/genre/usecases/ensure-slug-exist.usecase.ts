import { EnsureSlugExistInput } from '@v2-comic-be/core';
import { GenreRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnsureSlugExistUsecase {
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(input: EnsureSlugExistInput) {
    return this.genreRepository.ensureSlugExist(input);
  }
}
