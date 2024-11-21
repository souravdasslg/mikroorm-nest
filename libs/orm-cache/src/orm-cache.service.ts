import { CacheAdapter } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CacheManagerService } from '@app/cache-manager';
@Injectable()
export class OrmCache implements CacheAdapter {
  constructor(private readonly cacheManager: CacheManagerService) {}

  async get(name: string): Promise<any> {
    return await this.cacheManager.get(name);
  }

  async set(
    name: string,
    data: any,
    origin: string,
    expiration?: number,
  ): Promise<void> {
    await this.cacheManager.set(name, data, expiration);
  }

  async delete(name: string): Promise<void> {
    await this.cacheManager.del(name);
  }

  async clear(): Promise<void> {
    await Promise.resolve();
  }
  async remove(name: string): Promise<void> {
    await this.cacheManager.del(name);
  }
}
