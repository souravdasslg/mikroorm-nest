import { Migration } from '@mikro-orm/migrations';

export class Migration20241125153320 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "plan_v2" alter column "eligibility_os" type text using ("eligibility_os"::text);`);
    this.addSql(`alter table "plan_v2" alter column "eligibility_platform" type text using ("eligibility_platform"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "plan_v2" alter column "eligibility_os" type text[] using ("eligibility_os"::text[]);`);
    this.addSql(`alter table "plan_v2" alter column "eligibility_platform" type text[] using ("eligibility_platform"::text[]);`);
  }

}
