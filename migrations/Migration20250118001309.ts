import { Migration } from '@mikro-orm/migrations';

export class Migration20250118001309 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "plan_v2" ("id" bigserial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "country" text check ("country" in ('GLOBAL', 'IN')) not null, "currency" text check ("currency" in ('INR', 'USD')) not null, "derived_from" varchar(255) null, "eligibility_os" text check ("eligibility_os" in ('android', 'iOS')) not null, "eligibility_platform" text check ("eligibility_platform" in ('app', 'tv', 'web')) not null, "frequency" smallint not null, "localized_display_config" jsonb not null, "pricing_display" int not null, "pricing_post_trial" int not null, "pricing_trial" int not null, "status" text check ("status" in ('active', 'inactive')) not null, "validity_trial" int not null);`);

    this.addSql(`create table "mandate_v2" ("id" bigserial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "creation_amount" int not null, "expires_at" timestamptz not null, "transaction_id" bigint null, "max_amount" int not null, "pg" varchar(255) not null, "pg_mandate_id" varchar(255) null, "plan_id" bigint not null, "status" varchar(255) not null, "status_history" jsonb not null, "execution_details_execution_date" timestamptz null, "execution_details_execution_amount" int null, "execution_details_notification_status" varchar(255) null, "user" varchar(255) not null);`);
    this.addSql(`alter table "mandate_v2" add constraint "mandate_v2_transaction_id_unique" unique ("transaction_id");`);
    this.addSql(`create index "mandate_v2_creation_amount_expires_at_index" on "mandate_v2" ("creation_amount", "expires_at");`);

    this.addSql(`create table "mandate_transactions" ("id" bigserial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "amount" int not null, "status" varchar(255) not null, "mandate_id" bigint not null);`);

    this.addSql(`alter table "mandate_v2" add constraint "mandate_v2_transaction_id_foreign" foreign key ("transaction_id") references "mandate_transactions" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "mandate_v2" add constraint "mandate_v2_plan_id_foreign" foreign key ("plan_id") references "plan_v2" ("id") on update cascade;`);

    this.addSql(`alter table "mandate_transactions" add constraint "mandate_transactions_mandate_id_foreign" foreign key ("mandate_id") references "mandate_v2" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "mandate_v2" drop constraint "mandate_v2_plan_id_foreign";`);

    this.addSql(`alter table "mandate_transactions" drop constraint "mandate_transactions_mandate_id_foreign";`);

    this.addSql(`alter table "mandate_v2" drop constraint "mandate_v2_transaction_id_foreign";`);

    this.addSql(`drop table if exists "plan_v2" cascade;`);

    this.addSql(`drop table if exists "mandate_v2" cascade;`);

    this.addSql(`drop table if exists "mandate_transactions" cascade;`);
  }

}
