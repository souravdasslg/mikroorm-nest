import { Migration } from '@mikro-orm/migrations';

export class Migration20241123045848 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "mandate_v2" add constraint "mandate_v2_plan_id_foreign" foreign key ("plan_id") references "plan_v2" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "mandate_transactions" add column "mandate_id" varchar(255) not null;`,
    );
    this.addSql(
      `alter table "mandate_transactions" add constraint "mandate_transactions_mandate_id_foreign" foreign key ("mandate_id") references "mandate_v2" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "mandate_transactions" drop constraint "mandate_transactions_mandate_id_foreign";`,
    );

    this.addSql(
      `alter table "mandate_v2" drop constraint "mandate_v2_plan_id_foreign";`,
    );

    this.addSql(`alter table "mandate_transactions" drop column "mandate_id";`);
  }
}
