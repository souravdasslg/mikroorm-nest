import { Module } from '@nestjs/common';
import { OrmCache } from './orm-cache.service';
import { CacheManagerModule } from '@app/cache-manager';

@Module({
  providers: [OrmCache],
  exports: [OrmCache],
  imports: [CacheManagerModule],
})
export class OrmCacheModule {}
