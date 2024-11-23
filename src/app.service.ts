import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  EMasterMandateStatusEnum,
  EPaymentGatewayEnum,
  ExecutionDetails,
  MandateV2,
} from 'entities/mandate.entity';
import { MandateV2Repository } from 'repositories/mandate.repository';
import { Cursor, EntityManager } from '@mikro-orm/core';
import { QueueService } from './queue.service';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { MandateTxnRepository } from 'repositories/mandateTxn.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MandateV2)
    private readonly mandateRepository: MandateV2Repository,
    @InjectRepository(MandateTransactionsEntity)
    private readonly mandateTxnRepository: MandateTxnRepository,
    private readonly em: EntityManager,
    private readonly queueService: QueueService,
  ) {}

  async getMandate(id: string): Promise<MandateV2> {
    const res = await this.mandateRepository.findOneOrFail(
      { id },
      { failHandler: () => new Error('Mandate not found') },
    );
    return res;
  }
  async createMandate(): Promise<string> {
    const mandate = this.mandateRepository.create(
      {
        id: crypto.randomUUID(),
        status: EMasterMandateStatusEnum.PENDING,
        creationAmount: 100,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        maxAmount: 1000,
        pg: EPaymentGatewayEnum.STRIPE,
        pgMandateId: '1234567890',
        planId: '1234567890',
        statusHistory: [],
        user: '1234567890',
      },
      { persist: true },
    );
    await this.em.flush();
    // await this.mandateRepository.save(mandate);
    // await this.queueService.addToQueue(mandate);
    return mandate.id;
  }
  async getMandateWithTxn(id: string): Promise<Partial<MandateV2> | null> {
    const mandate = await this.mandateRepository.findOne(
      { id },
      {
        fields: ['statusHistory', 'user', 'transaction'],
        populate: ['transaction.status'],
        cache: true,
        orderBy: { createdAt: 'desc' },
      },
    );
    console.log(mandate);
    console.log(mandate?.transaction);
    return mandate;
  }

  async findMandateByEitherStatus() {
    this.mandateRepository.find({
      $and: [
        {
          executionDetails: { $exists: true },
        },
      ],
    });
  }

  async createTransactionForMandate(mandateId: string, amount: number) {
    return this.em.transactional(async (em) => {
      // Find the mandate
      const mandate = await em.findOne(MandateV2, { id: mandateId });
      if (!mandate) {
        throw new Error('Mandate not found');
      }

      // Create a new transaction
      const transaction = new MandateTransactionsEntity();
      transaction.amount = amount;
      transaction.status = mandate.status;

      // Update mandate with the new transaction
      mandate.transaction = transaction;
      mandate.statusHistory.push({
        status: mandate.status,
        timestamp: new Date(),
      });

      // Persist changes
      await em.persist(mandate);
      await em.persist(transaction);
      return {
        transactionId: transaction.id,
        mandate: mandate,
      };
    });
  }

  async findAllTransactions() {
    let hasNext: boolean = true;
    let lastCursor: string | null = null;
    let cursor: Cursor<MandateTransactionsEntity>;

    while (hasNext) {
      cursor = await this.mandateTxnRepository.findByCursor(
        {},
        {
          ...(lastCursor ? { after: lastCursor } : {}),
          first: 1,
          orderBy: { createdAt: 'desc' },
        },
      );
      hasNext = cursor.hasNextPage;
      lastCursor = cursor.endCursor;

      cursor.items.forEach((item) => {
        console.log(cursor.items.length);
        console.log({ endCursor: cursor.endCursor });
        console.log(item.id);
      });
    }
  }

  async updateExecutionDetails(mandateId: string, status: string) {
    await this.mandateRepository.updateOne(
      { id: mandateId },
      {
        executionDetails: {
          notificationStatus: status,
          executionDate: new Date(),
          executionAmount: 3,
        },
      },
    );
  }

  // async aggregateExecutionDetails(mandateId: string) {
  //   const mandate = await this.mandateRepository.aggregate([
  //     {
  //       $match: { $id: mandateId },
  //       $project: {
  //         executionDetails: 1,
  //       },
  //     },
  //   ]);
  //   console.log(mandate);
  // }
}
