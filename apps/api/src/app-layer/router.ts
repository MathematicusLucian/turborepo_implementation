// CONTROLLER
// This block of code is responsible for too many things:
// - handling the API request (controller responsibility)
// - performing validation on the domain object (not present here, but a domain entity or value object responsibility)
// - persisting a domain entity to the database (repository responsibility)

import { Hono } from 'hono'
import { createFactory } from 'hono/factory'  
import { UserService } from './users.handler'
import { User } from '../business-layer/user.domain'
import { zValidator } from '@hono/zod-validator'

const apiHandler = new Hono()
const userRouter = new UserService(createFactory())

const _h = apiHandler
  .get('/user/all', ...userRouter.usersGet())
  .get('/user/:id', ...userRouter.usersGetById())
  .post('/user/create', ...userRouter.createUser())
  .post('/user/update/:id', ...userRouter.updateUser())
  .delete('/user/delete/:id', ...userRouter.usersDelete()) 
  // .delete('/users/:id', zValidator('json', User), ...usersDelete)
  // some other routes 
  .get('/check', (c) => {
    return c.json({ status: 'ok' }, 200)
  })
export type RPC = typeof _h

export const setHandlers = (app: Hono) => {
  app.route('/api/v1', apiHandler)
  return app
}