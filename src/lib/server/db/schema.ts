import { boolean, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('global_user', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	birthdate: timestamp('birthdate'),
	phone: text('phone'),
	email: text('email'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	memberSince: timestamp('member_since').defaultNow()
});

export const category = pgTable('global_category', {
	id: uuid('id').primaryKey(),
	category: text('category')
});

export const session = pgTable('session', {
	id: uuid('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const entry = pgTable('expense', {
	id: uuid('id').primaryKey(),
	description: text('description'),
	date: timestamp('date'),
	recurring: boolean('recurring'),
	amount: numeric('amount'),
	type: uuid('category_id')
		.notNull()
		.references(() => category.id),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id)
});

export const budget = pgTable('budget', {
	id: uuid('id').primaryKey(),
	startDate: timestamp('start_date').notNull(),
	endDate: timestamp('end_date').notNull(),
	amount: numeric('amount').notNull(),
	limit: numeric('limit').default('10'),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id)
}) 

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Category = typeof category.$inferSelect;

export type Entry = typeof entry.$inferSelect;

export type Budget = typeof budget.$inferSelect;
