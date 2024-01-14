import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { IDatabase } from './database.types';

import Logger from '../utils/logger';

import 'dotenv/config';

class Database {
  public db: Kysely<IDatabase>;

  private host = process.env.POSTGRES_HOST;
  private port = process.env.POSTGRES_PORT;
  private database = process.env.POSTGRES_DB;
  private user = process.env.POSTGRES_USER;
  private password = process.env.POSTGRES_PASSWORD;
  private PGURL = this.constructPGURL();

  constructor() {
    Logger.info('Connecting to PostgreSQL...');
    this.db = this.connectToPostgresSQL();
    Logger.info('Connected to PostgreSQL');
  }

  private constructPGURL() {
    return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
  }

  private connectToPostgresSQL() {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: this.PGURL,
      }),
    });
    return new Kysely<IDatabase>({ dialect });
  }
}

export { Database };
const database = new Database();
export const db = database.db;
