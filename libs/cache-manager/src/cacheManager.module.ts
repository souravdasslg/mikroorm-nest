import { Module } from '@nestjs/common';

import { CacheManagerService } from './cacheManager.service';

@Module({
  exports: [CacheManagerService],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
