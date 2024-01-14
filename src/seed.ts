import * as path from 'path';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';

import { IDatabase } from './config/database.types';

import Logger from './utils/logger';

import 'dotenv/config';

export const seedDatabase = async () => {
  Logger.info('[SeedDatabase] Seeding database. Connecting to Postgres...');
  const targetedDB = process.env.NODE_ENV === 'test' ? 'test' : process.env.POSTGRES_DB;
  const PGURL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${targetedDB}`;

  const db = new Kysely<IDatabase>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: PGURL,
      }),
    }),
  });
  Logger.info('[SeedDatabase] Connected to Postgres');

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'seeders'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      Logger.info(`[SeedDatabase] seeder "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      Logger.error(`[SeedDatabase] failed to execute seeder "${it.migrationName}"`);
    }
  });

  if (error) {
    Logger.error('failed to seed');
    Logger.error(error);
    process.exit(1);
  }

  Logger.info('[SeedDatabase] Database seeded.');

  await db.destroy();
  Logger.info('[SeedDatabase] Disconnected from Postgres');
};
