import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MandateV2 } from 'entities/mandate.entity';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('mandate') private mandateQueue: Queue) {}

  async addToQueue(data: MandateV2) {
    await this.mandateQueue.add('mandate', data);
  }
}
