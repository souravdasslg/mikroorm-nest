import { MandateV2 } from 'entities/mandate.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MandateV2Repository extends EntityRepository<MandateV2> {}
