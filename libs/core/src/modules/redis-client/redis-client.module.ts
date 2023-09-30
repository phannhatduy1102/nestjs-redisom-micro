import { DynamicModule, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { Repository, Schema } from 'redis-om';

@Module({})
export class RedisClientModule {
  static redis = createClient();

  static async forRootAsync(): Promise<DynamicModule> {
    await this.redis.connect();
    return {
      module: RedisClientModule,
      imports: [],
      providers: [],
      exports: [],
    };
  }
  static forFeature(models: { name: string; schema: Schema }[]): DynamicModule {
    const providers = models.map((model) => ({
      provide: `Redis${model.name}Repository`,
      useFactory: async () => {
        const repository = new Repository(model.schema, this.redis);
        repository.createIndex();
        return repository;
      },
    }));

    return {
      module: RedisClientModule,
      imports: [],
      providers: [...providers],
      exports: [...providers.map((provider) => provider.provide)],
    };
  }
}
