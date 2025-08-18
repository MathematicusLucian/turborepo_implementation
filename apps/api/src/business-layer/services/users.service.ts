import type { IUserRepository } from '../../persistence-layer/user.repository'
import { NewUserDTO, UserDTO } from '../user.dto' 
import type { User as UserDomain } from '../user.domain'

export interface IDataService<T> { 
  getAll(c: any): Promise<T[]>; 
  findById: (c: any, id: string) => Promise<any>;
  delete: (c: any, id: string) => Promise<any>;
}

export interface IUserService extends IDataService<UserDTO> {
  create: (c: any, userData: any) => Promise<any>; // UserInsert
  update: (c: any, id: string, userData: Partial<any>) => Promise<any[]>; // UserInsert
}

export class UserService implements IUserService{ 
  constructor(private readonly userRepository: IUserRepository) {} 

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

  async findById(c: any, id: string): Promise<any> {
    return this.userRepository.findById(c, id)
  }

  async create(c: any, userData: any): Promise<any> { // NewUserDTO  // typeof users.$inferInsert
    return this.userRepository.create(c, userData)  
  }

  async update(c: any, id: string, userData: any): Promise<any> { // UserInsert //  userData: Partial<any>
    return this.userRepository.update(c, id, userData) 
  }

  async delete(c: any, id: string): Promise<any> {
    return this.userRepository.delete(c, id)
  } 
}