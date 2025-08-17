import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { usersGet, usersGetById, usersPost, usersDelete } from './users.handler'

const apiHandler = new Hono()

const _h = apiHandler
  .get('/users', ...usersGet)
  .get('/users/:id', ...usersGetById)
  .post('/users', ...usersPost)
//   .delete('/users/:id', zValidator('json', ...usersDelete))
  // some other routes 
  .get('/check', (c) => {
    return c.json({ status: 'ok' }, 200)
  })
export type RPC = typeof _h

export const setHandlers = (app: Hono) => {
  app.route('/api', apiHandler)
  return app
}

// app.get('/api/posts', async (c: any) => {
//     const dbAdapter = databaseConnection(c.env);
//     // const { getPosts, getPostById, createPost } = newPostService(dbAdapter);
//     // const posts = await getPosts();
//     // return c.json(posts)
//     return c.json({})
// });