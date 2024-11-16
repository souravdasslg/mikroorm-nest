import { Module } from '@nestjs/common';
import { OrmCache } from './orm-cache.service';
import { CacheManagerModule, CacheManagerService } from '@app/cache-manager';

@Module({
  providers: [OrmCache, CacheManagerService],
  exports: [OrmCache],
  imports: [CacheManagerModule],
})
export class OrmCacheModule {}
