import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MandateV2 } from 'entities/mandate.entity';
import { MongoDriver } from '@mikro-orm/mongodb';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { OrmCacheModule } from 'libs/orm-cache/src/orm-cache.module';
import { OrmCache } from 'libs/orm-cache/src/orm-cache.service';
import QueryString from 'qs';
import { CacheManagerService } from '@app/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { QueueConsumerService } from './queue-consumer.service';
import { QueueService } from './queue.service';
import { ScheduleJobService } from './scheduleJob.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';

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
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        debug: true,
        entities: [MandateV2, MandateTransactionsEntity],
        metadataProvider: TsMorphMetadataProvider,
        dbName: 'mikro',
        clientUrl: `mongodb://localhost:27017,localhost:27018,localhost:27019?${QueryString.stringify(
          {
            replicaSet: 'rs',
            maxPoolSize: 500,
            // maxStalenessSeconds: 300,
            minPoolSize: 300,
            readPreference: 'primary',
            retryWrites: true,
            socketTimeoutMS: 5000,
          },
        )}`,
        persistOnCreate: true,
        driver: MongoDriver,
      }),
      imports: [OrmCacheModule],
    }),
    MikroOrmModule.forFeature([MandateV2, MandateTransactionsEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    OrmCache,
    CacheManagerService,
    QueueConsumerService,
    QueueService,
    ScheduleJobService,
  ],
})
export class AppModule {}
