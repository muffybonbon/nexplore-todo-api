import { Pool } from 'pg';
import { PostgresDialect, Kysely } from 'kysely';

import { Database } from '../../config/database';
import Logger from '../../utils/logger';

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
    const expectedUrl = 'postgres://testuser:testpassword@localhost:5432/testdb';
    expect((database as any)['PGURL']).toBe(expectedUrl);
  });

  it('should initialize Kysely with a PostgresDialect', () => {
    expect(PostgresDialect).toHaveBeenCalledWith({
      pool: expect.any(Pool),
    });
    expect(database.db).toBeInstanceOf(Kysely);
  });

  it('should log connection messages', () => {
    expect(Logger.info).toHaveBeenCalledWith('Connecting to PostgreSQL...');
    expect(Logger.info).toHaveBeenCalledWith('Connected to PostgreSQL');
  });
});
