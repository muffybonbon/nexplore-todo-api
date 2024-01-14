import { Pool } from 'pg';
import { PostgresDialect, Kysely } from 'kysely';

import { Database } from '../../config/database';

jest.mock('pg', () => ({
  Pool: jest.fn(),
}));
jest.mock('kysely', () => ({
  PostgresDialect: jest.fn(),
  Kysely: jest.fn(),
}));
jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
}));

describe('Database', () => {
  let database: Database;

  beforeAll(() => {
    database = new Database();
  });

  it('should construct the correct PostgreSQL URL', () => {
    const expectedUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
    expect((database as never)['PGURL']).toBe(expectedUrl);
  });

  it('should initialize Kysely with a PostgresDialect', () => {
    expect(PostgresDialect).toHaveBeenCalledWith({
      pool: expect.any(Pool),
    });
    expect(database.db).toBeInstanceOf(Kysely);
  });
});
