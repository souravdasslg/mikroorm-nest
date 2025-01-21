import { Module } from '@nestjs/common';

import { RedisModule } from '@nestjs-modules/ioredis';

import { CacheManagerService } from './cacheManager.service';

@Module({
  exports: [CacheManagerService],
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: `redis://localhost:6379`,
      }),
    }),
  ],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
