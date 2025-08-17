import type { Repositories } from '../../persistence-layer/repositories'
import { UserService } from '../services/users.service'

export type Services = {
  userService: UserService
}

export const createServices = (repositories: Repositories): Services => {
  return {
    userService: new UserService(repositories.userRepository),
  }
}