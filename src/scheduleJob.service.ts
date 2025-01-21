import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';

@Injectable()
export class ScheduleJobService {
  constructor(@InjectQueue('mandate') private mandateQueue: Queue) {
    this.scheduleJob();
  }

  @Cron('*/1 * * * * *')
  scheduleJob() {
    this.mandateQueue.upsertJobScheduler(
      'mandate',
      {
        pattern: '*/1 * * * * *',
      },

      {
        name: randomUUID(),
      },
    );
  }
}
