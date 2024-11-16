import { CacheAdapter } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CacheManagerService } from '@app/cache-manager';
@Injectable()
export class OrmCache implements CacheAdapter {
  constructor(private cacheManager: CacheManagerService) {}

  async get<T>(name: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(name) as T | undefined;
  }

  async set(
    name: string,
    data: any,
    origin: string,
    expiration?: number,
  ): Promise<void> {
    await this.cacheManager.set(name, data, expiration ?? 1000000);
  }

  async remove(name: string): Promise<void> {
    await this.cacheManager.del(name);
  }

  async clear(): Promise<void> {
    await this.cacheManager.clear();
  }
}
