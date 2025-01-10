import { PlanV2 } from 'entities/plan';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PlanV2Repository extends EntityRepository<PlanV2> {}
