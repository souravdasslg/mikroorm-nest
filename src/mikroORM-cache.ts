import { CacheAdapter } from '@mikro-orm/core';
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class OrmCache implements CacheAdapter {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(name: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(name);
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
    await this.cacheManager.reset();
  }
}
