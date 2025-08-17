// DAO
import { eq } from 'drizzle-orm'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './schema' 
import type { UserDomain } from '../business-layer/user.domain';

const users: any[] | any = schema.users

export interface UserRepository {
  create(user: typeof users.$inferInsert): Promise<UserDomain>
  findAll(): Promise<UserDomain[]>
  findById(id: string): Promise<UserDomain[]>
  delete(id: string): Promise<UserDomain>
}

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: DrizzleD1Database<typeof schema>) {}

  async create(user: typeof users.$inferInsert): Promise<UserDomain> {
    const result = await this.db.insert(users).values(user).returning()
    return result[0]
  //     if (typeof userData.name !== 'string') {
  //       throw new Error('Name is required and must be a string');
  //     }
  //     return db.insert(users).values(userData as typeof users.$inferInsert).returning();
  }

  async findAll(): Promise<UserDomain[]> {
    const result = await this.db.select().from(users)
    return result
  }

  async findById(id: string): Promise<UserDomain[]> {
    const result = await this.db.select().from(users).where(eq(users.id, id))
    return result
    //     return db.select().from(users).where(eq(users.id, parseInt(id))).limit(1);
  }

  // Update
  //     return db.update(users).set(userData).where(eq(users.id, parseInt(id))).returning();

  async delete(id: string): Promise<UserDomain> {
    const result = await this.db.delete(users).where(eq(users.id, id)).returning()
    return result[0]
  //     return db.delete(users).where(eq(users.id, parseInt(id))).returning();
  }
}