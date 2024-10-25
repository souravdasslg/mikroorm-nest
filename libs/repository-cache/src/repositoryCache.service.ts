// import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
// import { Inject, Injectable } from '@nestjs/common';
// import { FilterQuery, Model } from 'mongoose';

// import { Logger } from '@nestjs/common';

// import { APP_CONFIGS } from '@app/common/configs/app.config';
// import { BaseModel } from '@app/common/entities/base.entity';

// interface CacheQueryOptions {
//   key: string;
//   ttl?: number;
// }

// @Injectable()
// export class RepositoryCacheService<T extends BaseModel> {
//   private defaultTTL: number;
//   private logger = new Logger(RepositoryCacheService.name);

//   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
//     this.defaultTTL = APP_CONFIGS.PLATFORM.DEFAULT_CACHE_TTL;
//   }

//   private _getMatchingKeys(pattern: string) {
//     return this.cacheManager.store.keys(pattern);
//   }

//   async cacheQuery<T>(
//     query: () => Promise<T>,
//     { key, ttl }: CacheQueryOptions,
//   ): Promise<T | null> {
//     const cachedResult = await this.cacheManager.get(key);
//     if (cachedResult) {
//       this.logger.debug(`Cache hit for ${key}`);
//       return cachedResult as T;
//     }
//     const result = await query();

//     // To skip null caching
//     if (result) {
//       this.cacheManager.set(key, result, ttl ?? this.defaultTTL);
//       return result;
//     }

//     return null;
//   }

//   clearCacheByCollectionName(model: Model<T>) {
//     this._getMatchingKeys(`${model.modelName}*`).then((keys) => {
//       this.logger.debug(`Clearing cache for ${model.modelName}`);
//       this.cacheManager.store.mdel(...keys);
//     });
//   }

//   getCacheKey<K extends keyof T>(
//     key: Model<T>,
//     query: FilterQuery<T>,
//     projection?: K[],
//   ) {
//     // TODO: do this json stringify with nestia
//     return `${key.modelName}:${JSON.stringify(query)}:${projection?.join(':')}`.trim();
//   }
// }
