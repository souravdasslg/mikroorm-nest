import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MandateV2 } from 'entities/mandate.entity';
import { BullModule } from '@nestjs/bullmq';
import { QueueConsumerService } from './queue-consumer.service';
import { QueueService } from './queue.service';
import { ScheduleJobService } from './scheduleJob.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { PlanV2 } from 'entities/plan';
import { MandateTxnRepository } from 'repositories/mandateTxn.repository';
import { PlanV2Repository } from 'repositories/plan.repository';
import { MandateV2Repository } from 'repositories/mandate.repository';

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
    MikroOrmModule.forFeature([MandateV2, MandateTransactionsEntity, PlanV2]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // OrmCache,
    // CacheManagerService,
    QueueConsumerService,
    QueueService,
    ScheduleJobService,
    MandateV2Repository,
    MandateTxnRepository,
    PlanV2Repository,
  ],
})
export class AppModule {}
