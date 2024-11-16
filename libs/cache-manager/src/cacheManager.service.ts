import KeyvRedis from '@keyv/redis';
import { Injectable } from '@nestjs/common';

import Keyv from 'keyv';

@Injectable()
export class CacheManagerService {
  private keyvStore;
  private redisStore;
  constructor() {
    this.redisStore = new KeyvRedis({
      uri: `redis://127.0.0.1:6379`,
    });
    const keyvInstance = new Keyv(this.redisStore);
    this.redisStore.on('error', (err) => {
      console.error('Keyv Redis Error:', err);
    });
    this.keyvStore = keyvInstance;
  }
  clear() {
    return this.keyvStore.clear();
  }
  del(key: string): Promise<boolean> {
    return this.keyvStore.delete(key);
  }
  async get<T>(key: string): Promise<T | null> {
    return this.keyvStore.get(key);
  }
  keys(pattern: string): Promise<string[]> {
    return Promise.resolve(['pattern']);
  }
  mdel(keys: string[]): Promise<boolean> {
    return this.keyvStore.delete(keys);
  }
  mget<T>(keys: string[]): Promise<T[]> {
    return this.keyvStore.get(keys);
  }
  set<T>(key: string, value: T, ttl?: number) {
    return this.keyvStore.set(key, value, ttl);
  }
}
