import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './schema'
import { DrizzleUserRepository } from './user.repository'
// import { poolConnectionString } from "./drizzle.config";

export type Repositories = {
  userRepository: DrizzleUserRepository
}

export const createRepositories = (db: DrizzleD1Database<typeof schema>): Repositories => {
  return {
    userRepository: new DrizzleUserRepository(db),
  }
}