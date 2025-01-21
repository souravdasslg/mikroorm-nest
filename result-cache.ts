import Redis from 'ioredis';
import { CacheAdapter } from '@mikro-orm/core';

export class RedisCache implements CacheAdapter {
  private client: Redis;

  constructor() {
    this.client = new Redis('redis://localhost:6379');
  }

  async get<T = any>(name: string): Promise<T | undefined> {
    const value = await this.client.get(name);
    if (!value) return undefined;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return undefined;
    }
  }

  async set(
    name: string,
    data: any,
    origin?: string,
    expiration?: number,
  ): Promise<void> {
    const value = typeof data === 'object' ? JSON.stringify(data) : data;
    if (expiration) {
      await this.client.set(name, value, 'EX', Math.round(expiration / 1000));
    } else {
      await this.client.set(name, value);
    }
  }

  async remove(name: string): Promise<void> {
    await this.client.del(name);
  }

  async clear(): Promise<void> {
    await this.client.flushall();
  }
}
