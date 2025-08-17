// DAO 
import { databaseConnection } from '../data-layer/db';  
import { NewUserDTO, UserDTO } from '../business-layer/user.dto'
import { users as userSchema } from './orm-schema'    
import {User} from '../business-layer/user.domain'
import type { User as UserDomain } from '../business-layer/user.domain'
import { eq } from 'drizzle-orm';

export interface UserRepository {
  findAll(c: any): Promise<UserDomain[]>
  findById(c: any, id: string): Promise<UserDomain>
  create(c: any, userData: any): Promise<UserDomain> // typeof users.$inferInsert
  update(c: any, id: string, userData: any): Promise<UserDomain>
  delete(c: any, id: string): Promise<UserDomain>
}

export class DrizzleUserRepository implements UserRepository {
  constructor() {} 

  async findAll(c: any): Promise<UserDomain[]> {
      let usersFromSQLString: any;
      let usersFromDrizzle: UserDomain[];
      try {
        const dbAdapter = databaseConnection(c.env);  
        usersFromDrizzle = await dbAdapter.drizzlePool.select().from(userSchema);  
        const sql = `
          SELECT * FROM users
        `
        usersFromSQLString = await dbAdapter.pool.query(sql)  
      } catch (err) {
        return c.json({"err": err})
      }  
      return usersFromDrizzle 
  } 
 
  async findById(c: any, id: string): Promise<UserDomain> {
    let userFromDrizzle: UserDomain[];
      try {
        const dbAdapter = databaseConnection(c.env);  
        userFromDrizzle = await dbAdapter.drizzlePool.select().from(userSchema).where(eq(userSchema.id, parseInt(id))).limit(1);
      } catch (err) {
        return c.json({"err": err})
      }
    return userFromDrizzle[0]
  }

  async create(c: any, userData: any): Promise<UserDomain> {
  // async create(data: NewUserDTO): Promise<UserDTO> {
  // async create(user: typeof users.$inferInsert): Promise<UserDomain> {
    // const inserted = await this.db.insert(users).values(user).returning() //return db.insert(users).values(userData as typeof users.$inferInsert).returning();
    // return result[0]
    let inserted: any[] | any;
    try {
      const dbAdapter = databaseConnection(c.env); 
      inserted = await dbAdapter.drizzlePool.insert(userSchema).values({
        name: userData.name,
      }).returning()
    } catch (err) {
      return c.json({"err": err})
    } 
    const userCreated: UserDomain = new User(inserted[0].id, inserted[0].name,  inserted[0].createdAt)
    return userCreated
  }

  async update(c: any, id: any, userData: any): Promise<UserDomain> {
    let updated: any[]|any;
    try {
      const dbAdapter = databaseConnection(c.env); 
      updated = dbAdapter.drizzlePool.update(userSchema).set(userData).where(eq(userSchema.id, parseInt(id))).returning();
    } catch (err) {
      return c.json({"err": err})
    }
    return updated
  }

  async delete(c: any, id: string): Promise<UserDomain> {
    let deleted: any[]|any;
    try {
      const dbAdapter = databaseConnection(c.env); 
      deleted = dbAdapter.drizzlePool.delete(userSchema).where(eq(userSchema.id, parseInt(id))).returning();
      // return db.delete(users).where(eq(users.id, parseInt(id))).returning(); 
      //await this.db.delete(users).where(eq(users.id, id)).returning()
    } catch (err) {
      return c.json({"err": err})
    }  
    return deleted
  }
}