import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import Logger from '../../utils/logger';

import { IDatabase } from '../../config/database.types';

const globalTeardown = async () => {
  const PGURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/test`;

  const db = new Kysely<IDatabase>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: PGURL,
      }),
    }),
  });

  Logger.info('[GlobalTeardown] Dropping database...');
  /* Destroy the database after all tests have finished. */
  await db.schema.dropTable('todo').execute();
  await db.schema.dropTable('kysely_migration').execute();
  await db.schema.dropTable('kysely_migration_lock').execute();
  Logger.info('[GlobalTeardown] Database dropped.');

  await db.destroy();
  Logger.info('[GlobalTeardown] Database connection closed.');
};

export default globalTeardown;
