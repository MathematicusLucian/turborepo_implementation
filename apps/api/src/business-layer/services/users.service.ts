import type { UserRepository } from '../../persistence-layer/user.repository'
import { NewUserDTO, UserDTO } from '../user.dto' 
import type { User as UserDomain } from '../user.domain'

export interface UserService {
  getUsers(c: any): Promise<UserDTO[]>;
  getUserById: (c: any, id: string) => Promise<UserDTO[]>;
  createUser: (c: any, userData: any) => Promise<UserDTO[]>; // UserInsert
  updateUser: (c: any, id: string, userData: Partial<any>) => Promise<UserDTO[]>; // UserInsert
  deleteUser: (c: any, id: string) => Promise<UserDTO[]>;
}

export class UserService implements UserService{ 
  constructor(private readonly userRepository: UserRepository) {} 

  async getAll(c: any): Promise<UserDTO[]> {  
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

  async findById(c: any, id: string): Promise<UserDomain> {
    return this.userRepository.findById(c, id)
  }

  async create(c: any, userData: any): Promise<UserDomain> { // NewUserDTO  // typeof users.$inferInsert
    return this.userRepository.create(c, userData)  
  }

  async update(c: any, id: string, userData: Partial<any>): Promise<any> { // UserInsert
    return this.userRepository.update(c, id, userData) 
  }

  async delete(c: any, id: string): Promise<UserDomain> {
    return this.userRepository.delete(c, id)
  } 

}