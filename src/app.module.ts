import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MandateV2 } from 'entities/mandate.entity';
import { OrmCacheModule } from 'libs/orm-cache/src/orm-cache.module';
import { OrmCache } from 'libs/orm-cache/src/orm-cache.service';
import QueryString from 'qs';
import { CacheManagerModule, CacheManagerService } from '@app/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { QueueConsumerService } from './queue-consumer.service';
import { QueueService } from './queue.service';
import { ScheduleJobService } from './scheduleJob.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mandate',
      defaultJobOptions: {
        delay: 5000,
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
      },
    }),
    MikroOrmModule.forRoot(),
    // MikroOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     debug: true,
    //     ensureIndexes: true,
    //     entities: ['dist/**/*.entity.js'],
    //     entitiesTs: ['**/*.entity.ts'],
    //     metadataProvider: TsMorphMetadataProvider,
    //     dbName: 'mikro',
    //     clientUrl: `mongodb://localhost:27017,localhost:27018,localhost:27019`,
    //     driverOptions: {
    //       replicaSet: 'rs',
    //       maxPoolSize: 500,
    //       // maxStalenessSeconds: 300,
    //       minPoolSize: 300,
    //       readPreference: 'primary',
    //       retryWrites: true,
    //       socketTimeoutMS: 5000,
    //     },

    //     persistOnCreate: true,
    //     flushMode: FlushMode.ALWAYS,
    //     registerRequestContext: true,
    //     driver: MongoDriver,
    //     metadataCache: {
    //       enabled: true,
    //       pretty: true,
    //       combined: true,
    //       file: 'metadata.cache.json',
    //     },
    //   }),
    //   imports: [OrmCacheModule, CacheManagerModule],
    //   providers: [OrmCache, CacheManagerService],
    // }),
    MikroOrmModule.forFeature([MandateV2, MandateTransactionsEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // OrmCache,
    // CacheManagerService,
    QueueConsumerService,
    QueueService,
    ScheduleJobService,
  ],
})
export class AppModule {}
