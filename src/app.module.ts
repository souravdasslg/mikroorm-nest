import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MandateV2 } from 'entities/mandate.entity';
import {  MongoDriver } from '@mikro-orm/mongodb';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { OrmCache } from './mikroORM-cache';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: redisStore,
          ttl: 10000,
          url: `redis://localhost:6379`,
        };
      },
    }),
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        debug: true,
        entities: [MandateV2],
        metadataProvider: TsMorphMetadataProvider,
        dbName: 'mikro',
        clientUrl: 'mongodb://localhost:27017',
        persistOnCreate: true,
        driver: MongoDriver,
        driverOptions: {
          maxPoolSize: 500,
          maxStalenessSeconds: 300,
          minPoolSize: 300,
          readPreference: 'secondaryPreferred',
          retryWrites: true,
          socketTimeoutMS: 5000,
        },
        resultCache: {
          expiration: 1000000,
          adapter: OrmCache,
          options: {
            url: `redis://localhost:6379`,
            debug: true,
          },
        },
      }),
    }),
    MikroOrmModule.forFeature([MandateV2]),
  ],
  controllers: [AppController],
  providers: [AppService, OrmCache],
})
export class AppModule {}
