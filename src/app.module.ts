import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheAdapter } from '@mikro-orm/core';
import { MandateV2 } from 'entities/mandate.entity';
import { MongoDriver } from '@mikro-orm/mongodb';
class MemoryCacheAdapter implements CacheAdapter {
  get<T>(name: string): T | Promise<T | undefined> | undefined {
    console.log('get', name);
    return undefined;
  }

  set(
    name: string,
    data: any,
    origin: string,
    expiration?: number,
  ): Promise<void> {
    console.log('set', name, data, origin, expiration);
    return Promise.resolve();
  }

  remove(name: string): Promise<void> {
    return Promise.resolve();
  }

  clear(): Promise<void> {
    return Promise.resolve();
  }
}

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [MandateV2],
      dbName: 'mikro',
      clientUrl: 'mongodb://localhost:27017',
      persistOnCreate: true,
      driver: MongoDriver,
      resultCache: {
        adapter: MemoryCacheAdapter,
      },
    }),
    MikroOrmModule.forFeature([MandateV2]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
