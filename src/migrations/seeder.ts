/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('todo')
    .addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('is_done', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('created_at', 'text', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn('created_by', 'text', (col) => col.notNull())
    .addColumn('updated_at', 'text', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn('updated_by', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex('todo_id_idx')
    .on('todo')
    .column('id')
    .execute();
}
