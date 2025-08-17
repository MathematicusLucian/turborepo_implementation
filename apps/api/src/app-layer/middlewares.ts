import type { Hono } from 'hono'
import { cors } from 'hono/cors'
import { contextStorage } from 'hono/context-storage'
import { createFactory } from 'hono/factory'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { drizzle } from 'drizzle-orm/d1'
import { createRepositories } from '../persistence-layer/repositories'
import { createServices } from '../business-layer/services'
import * as schema from '../persistence-layer/schema/index'

export const setMiddlewares = (app: Hono) => {
// export const setMiddlewares = (app: Hono<HonoENV>): Hono<HonoENV> => {

  app.use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}`)
  })

  app.use(setInfrastructure)

  // app.use('*', clerkMiddleware())
  app.get('/', (c: any) => {
      return c.json({ message: 'Use the /api prefix' })
  });
  // app.use('/dashboard/*', setAuthForDashboard)
  // app.use('/api/*', setAuthForAPI)

  app.get('/api', (c: any) => {
      return c.json({ message: 'Welcome to the API' })
  });

  app.use('/api/*', cors())

  return app
}

const F = createFactory()

const setInfrastructure = F.createMiddleware(async (c: any, next) => {
  const repositories = createRepositories(drizzle(c.env.DB, { schema }))
  const services = createServices(repositories)
  c.set('services', services)
  return next()
})

// const setAuthForDashboard = F.createMiddleware(async (c, next) => {
//   const auth = getAuth(c)

//   if (!auth || !auth.userId) {
//     return c.redirect('/')
//   }

//   return next()
// })

// const setAuthForAPI = F.createMiddleware(async (c, next) => {
//   const _ = getAuth(c)

//   // do some other auth for API

//   return next()
// })