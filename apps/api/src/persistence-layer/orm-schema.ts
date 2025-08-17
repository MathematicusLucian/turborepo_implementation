import { integer, serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";
// // import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
// import { sql, type InferSelectModel } from 'drizzle-orm'
// import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// import { ulid } from 'ulidx'

// Table definitions
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  // id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  // email: text('email').notNull(),
  // createdAt: timestamp("created_at", { precision: 3 }).notNull().defaultNow(),
  // createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  // email: text('email').unique().notNull(),
  // password: text('password'),
  // image: text('image'),
  // provider: text('provider'),
})

// Type inference
export type User = typeof users.$inferSelect
// export type User = InferSelectModel<typeof users>
// export const usersSelectSchema: any = createSelectSchema(users);
export type NewUser = typeof users.$inferInsert
// export const usersInsertSchema: any = createInsertSchema(users);

// export const posts = pgTable('posts', {
//   id: serial('id').primaryKey(),
//   userId: serial('user_id').references(() => users.id),
//   title: text('title').notNull(),
//   content: text('content'),
//   createdAt: timestamp('created_at').defaultNow(),
// })

// export type Post = typeof posts.$inferSelect
// export type NewPost = typeof posts.$inferInsert