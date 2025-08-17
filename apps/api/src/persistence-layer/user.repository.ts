// DAO 
import { databaseConnection } from '../data-layer/db';  
import { NewUserDTO, UserDTO } from '../business-layer/user.dto'
import { users as userSchema } from './orm-schema'    
import type { User as UserDomain } from '../business-layer/user.domain'

export interface UserRepository {
  // create(user: typeof users.$inferInsert): Promise<UserDomain>
  // findAll(): Promise<UserDomain[]>
  findAll(c: any): Promise<UserDomain[]>
  // findById(id: string): Promise<UserDomain[]>
  // delete(id: string): Promise<UserDomain>
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

  // async create(user: typeof users.$inferInsert): Promise<UserDomain> {
  //   // const result = await this.db.insert(users).values(user).returning()
  //   //     if (typeof userData.name !== 'string') {
  //   //       throw new Error('Name is required and must be a string');
  //   //     }
  //   //     return db.insert(users).values(userData as typeof users.$inferInsert).returning();
  //   // return result[0]
  //   const result = {
  //     id: 1,
  //     name: "stzring",
  //     createdAt: new Date()
  //   };
  //   return result
  // }
  // async create(data: NewUserDTO): Promise<UserDTO> {
  //   const inserted = await db.insert(users).values({
  //     name: data.name,
  //     email: data.email,
  //   }).returning()
  //   const u = inserted[0]
  //   return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString() } 
  //   const u = new User(inserted[0].id, inserted[0].name, inserted[0].email, inserted[0].createdAt)
  //   return {
  //     id: u.id,
  //     name: u.name,
  //     email: u.email,
  //     createdAt: u.createdAt.toISOString(),
  //   }
  // }
 
  // async findById(id: string): Promise<UserDomain[]> {
  //   // const result = await this.db.select().from(users).where(eq(users.id, id))
  //   //     return db.select().from(users).where(eq(users.id, parseInt(id))).limit(1);
  //   const result = [{
  //     id: 1,
  //     name: "stzring",
  //     createdAt: new Date()
  //   }];
  //   return result 
  // }

  // // Update
  // //     return db.update(users).set(userData).where(eq(users.id, parseInt(id))).returning();

  // async delete(id: string): Promise<UserDomain> {
  //   // const result = await this.db.delete(users).where(eq(users.id, id)).returning()
  // //     return db.delete(users).where(eq(users.id, parseInt(id))).returning();
  //   // return result[0]
  //   const result = {
  //     id: 1,
  //     name: "stzring",
  //     createdAt: new Date()
  //   };
  //   return result
  // }
}