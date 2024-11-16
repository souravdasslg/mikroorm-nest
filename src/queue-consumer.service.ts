import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MandateV2 } from 'entities/mandate.entity';

@Processor('mandate')
export class QueueConsumerService extends WorkerHost {
  async process(job: Job<MandateV2>) {
    console.log('The job is processed on', process.pid);
    console.log(job.data);
    console.log(job.attemptsMade);
    console.log(new Date().toISOString());
    console.log(job.name);
  }
}
