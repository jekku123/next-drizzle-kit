import 'dotenv/config';

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, sql } from './index';

async function main() {
  await migrate(db, { migrationsFolder: './migrations' });
  await sql.end();
}

main();
