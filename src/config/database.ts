import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { IDatabase } from './database.types';

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
    this.db = this.createPostgresDialect();
  }

  private constructPGURL() {
    return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
  }

  private createPostgresDialect() {
    const pool = new Pool({ connectionString: this.PGURL });
    const dialect = new PostgresDialect({ pool });
    return new Kysely<IDatabase>({ dialect });
  }
}

export { Database };
const database = new Database();
export const db = database.db;
