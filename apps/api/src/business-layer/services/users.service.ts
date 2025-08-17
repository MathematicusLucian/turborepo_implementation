// import { users, usersInsertSchema } from '../../persistence-layer/schema/users'; 
// import { users } from "../schema/users";
// import { User, UserInsert } from "../schema/users";
import type { UserRepository } from '../../persistence-layer/user.repository'
import { NewUserDTO, UserDTO } from '../user.dto' 
import type { User as UserDomain } from '../user.domain'

// export interface UserService {
//   getUsers: (c: any) => SQL<User[]>;
//   getUserById: (id: string) => SQL<User[]>;
//   createUser: (userData: UserInsert) => SQL<User[]>;
//   updateUser: (id: string, userData: Partial<UserInsert>) => SQL<User[]>;
//   deleteUser: (id: string) => SQL<User[]>;
// }

export class UserService { // export function UserService(db: any): UserService {
  constructor(private readonly userRepository: UserRepository) {} 

  async getUsers(c: any): Promise<UserDTO[]> {  
    const users: UserDomain[] = await this.userRepository.findAll(c); 
    const usersDTOsInstance: UserDTO[] = users.map((u: any) => {
      return {
        id: u.id,
        name: u.name,
        createdAt: u.createdAt
      }
    })
    return usersDTOsInstance;
  }


  // async create(user: typeof users.$inferInsert): Promise<UserDomain> {
  //   return this.userRepository.create(user)
  // }
  // createUser(data: NewUserDTO): Promise<UserDTO> {
  //   // Example business rule: name must not be empty
  //   if (!data.name.trim()) throw new Error('Name cannot be empty')
  //   return this.userRepository.create(data)
//   //     if (typeof userData.name !== 'string') {
//   //       throw new Error('Name is required and must be a string');
//   //     }
//   //     return db.insert(users).values(userData as typeof users.$inferInsert).returning();
  // }

//   async findById(id: string): Promise<UserDomain[]> {
//     return this.userRepository.findById(id)
//   //     return db.select().from(users).where(eq(users.id, parseInt(id))).limit(1);
//   }

//   //   updateUser: (id: string, userData: Partial<UserInsert>) => {
//   //     return db.update(users).set(userData).where(eq(users.id, parseInt(id))).returning();
//   //   },

//   async delete(id: string): Promise<UserDomain> {
//     return this.userRepository.delete(id)
//   //     return db.delete(users).where(eq(users.id, parseInt(id))).returning();
//   } 

}