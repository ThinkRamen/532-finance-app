import {
	pgTable,
	decimal,
	text,
	integer,
	boolean,
	timestamp,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	createAt: timestamp("created_at").notNull().defaultNow(),
});

export const accounts = pgTable("accounts", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	type: text("type").notNull(), // 'SAVINGS' \ 'ASSETS' \ 'DEBT'
	balance: decimal("balance", { precision: 12, scale: 2 })
		.notNull()
		.default("0"),
	interestRate: decimal("interest_rate", { precision: 5, scale: 2 })
		.notNull()
		.default("0"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projections = pgTable("projections", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	income: decimal("income", { precision: 12, scale: 2 }).notNull(),
	needsPercent: integer("needs_percent").notNull().default(50),
	wantsPercent: integer("wants_percent").notNull().default(30),
	savingsPercent: integer("savings_percent").notNull().default(20),
	years: integer("years").notNull().default(10),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
