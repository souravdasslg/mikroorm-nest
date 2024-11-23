import { Migration } from '@mikro-orm/migrations';

export class Migration20241123035827 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "mandate_transactions" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "amount" int not null, "status" varchar(255) not null, constraint "mandate_transactions_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "mandate_v2" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "creation_amount" int not null, "expires_at" timestamptz not null, "transaction_id" varchar(255) null, "max_amount" int not null, "pg" varchar(255) not null, "pg_mandate_id" varchar(255) null, "plan_id" varchar(255) not null, "status" varchar(255) not null, "status_history" jsonb not null, "execution_details_execution_date" timestamptz null, "execution_details_execution_amount" int null, "execution_details_notification_status" varchar(255) null, "user" varchar(255) not null, constraint "mandate_v2_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "mandate_v2" add constraint "mandate_v2_transaction_id_unique" unique ("transaction_id");`,
    );
    this.addSql(
      `create index "mandate_v2_creation_amount_expires_at_index" on "mandate_v2" ("creation_amount", "expires_at");`,
    );

    this.addSql(
      `create table "plan_v2" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "country" varchar(255) not null, "currency" varchar(255) not null, "derived_from" varchar(255) null, "eligibility_os" text[] not null, "eligibility_platform" varchar(255) not null, "frequency" varchar(255) not null, "localized_display_config" jsonb not null, "pricing_display" int not null, "pricing_post_trial" int not null, "pricing_trial" int not null, "status" varchar(255) not null, "validity_trial" int not null, constraint "plan_v2_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "mandate_v2" add constraint "mandate_v2_transaction_id_foreign" foreign key ("transaction_id") references "mandate_transactions" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "mandate_v2" drop constraint "mandate_v2_transaction_id_foreign";`,
    );

    this.addSql(`drop table if exists "mandate_transactions" cascade;`);

    this.addSql(`drop table if exists "mandate_v2" cascade;`);

    this.addSql(`drop table if exists "plan_v2" cascade;`);
  }
}
