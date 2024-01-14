import * as path from 'path';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';

import { IDatabase } from './src/config/database.types';

import Logger from './src/utils/logger';

import 'dotenv/config';

async function migrateToLatest() {
  const PGURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

  const db = new Kysely<IDatabase>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: PGURL,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'src/seeders'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      Logger.info(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      Logger.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    Logger.error('failed to migrate');
    Logger.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
