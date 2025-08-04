import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const invitations = pgTable('invitations', {
  id: varchar('id', { length: 50 }).primaryKey(),
  link: text('link').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('open'),
  user: varchar('user', { length: 100 }), // nullable
  loginEmail: varchar('login_email', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;