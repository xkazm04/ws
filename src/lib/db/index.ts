import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { invitations } from './schema';

export const db = drizzle(sql);

// Auto-create table function (call this in your API routes for quick dev)
export async function ensureTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS invitations (
        id VARCHAR(50) PRIMARY KEY,
        link TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'open',
        "user" VARCHAR(100),
        login_email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
  } catch (error) {
    console.log('Table already exists or creation failed:', error);
  }
}

export { invitations };