import { CacheAdapter, Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { FlushMode } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MandateV2 } from 'entities/mandate.entity';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { PlanV2 } from 'entities/plan';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import Redis from 'ioredis';

class RedisCache implements CacheAdapter {
  private client: Redis;

  constructor() {
    this.client = new Redis('redis://localhost:6379');
  }

  async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    return value ? value : null;
  }

  async set(key: string, value: any): Promise<void> {
    console.log('set', key, value);
    await this.client.set(key, value);
  }

  async remove(key: string): Promise<void> {
    await this.client.del(key);
  }

  async clear(): Promise<void> {
    await this.client.flushall();
  }
}

const config: Options = {
  dbName: 'postgres',
  debug: true,
  driver: PostgreSqlDriver,
  extensions: [EntityGenerator, Migrator],
  entities: [MandateV2, MandateTransactionsEntity, PlanV2],
  entitiesTs: [MandateV2, MandateTransactionsEntity, PlanV2],
  host: 'localhost',
  metadataProvider: TsMorphMetadataProvider,
  password: '12345678',
  port: 5432,
  user: 'postgres',
  persistOnCreate: true,
  flushMode: FlushMode.ALWAYS,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'migrations',
  },
  entityGenerator: {
    save: true,
    path: 'src/modules',
    esmImport: true,
    readOnlyPivotTables: true,
    outputPurePivotTables: true,
    bidirectionalRelations: true,
    customBaseEntityName: 'Base',
    useCoreBaseEntity: true,
  },
  resultCache: {
    adapter: RedisCache,
    expiration: 60000, // 1 minute
    global: false,
  },
  seeder: {
    path: './seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default config;
