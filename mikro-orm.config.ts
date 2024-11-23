import { FlushMode, Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MandateV2 } from 'entities/mandate.entity';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { PlanV2 } from 'entities/plan';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';

const config: Options = {
  dbName: 'postgres',
  debug: true,
  driver: PostgreSqlDriver,
  extensions: [EntityGenerator, Migrator],
  entities: [MandateV2, MandateTransactionsEntity, PlanV2],
  entitiesTs: [MandateV2, MandateTransactionsEntity, PlanV2],
  host: '127.0.0.1',
  metadataProvider: TsMorphMetadataProvider,
  password: '12345678',
  port: 5432,
  user: 'postgres',
  persistOnCreate: true,
  flushMode: FlushMode.ALWAYS,
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
};

export default config;
