import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";
// import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql, type InferSelectModel } from 'drizzle-orm'
import { ulid } from 'ulidx'

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  // id: text('id').$defaultFn(ulid).primaryKey(),
  name: text("name").notNull(),
  // name: text('name'),
  createdAt: timestamp("created_at", { precision: 3 }).notNull().defaultNow(),
  // createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  // email: text('email').unique().notNull(),
  // password: text('password'),
  // image: text('image'),
  // provider: text('provider'),
});

// export type User = typeof users.$inferSelect;
export type User = InferSelectModel<typeof users>
export type UserInsert = typeof users.$inferInsert;

export const usersInsertSchema: any = createInsertSchema(users);
export const usersSelectSchema: any = createSelectSchema(users);