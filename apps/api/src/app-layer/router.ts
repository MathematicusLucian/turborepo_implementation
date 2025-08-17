// CONTROLLER
// This block of code is responsible for too many things:
// - handling the API request (controller responsibility)
// - performing validation on the domain object (not present here, but a domain entity or value object responsibility)
// - persisting a domain entity to the database (repository responsibility)

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { usersGet, usersGetById, createUser, updateUser, usersDelete } from './users.handler'

const apiHandler = new Hono()

const _h = apiHandler
  .get('/user/all', ...usersGet)
  .get('/user/:id', ...usersGetById)
  .post('/user/create', ...createUser)
  .post('/user/update/:id', ...updateUser)
  .delete('/user/delete/:id', ...usersDelete) // .delete('/users/:id', zValidator('json', users), ...usersDelete)
  // some other routes 
  .get('/check', (c) => {
    return c.json({ status: 'ok' }, 200)
  })
export type RPC = typeof _h

export const setHandlers = (app: Hono) => {
  app.route('/api/v1', apiHandler)
  return app
}