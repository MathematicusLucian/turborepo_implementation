import { createFactory } from 'hono/factory'  
import { UserDTO, NewUserDTO } from '../business-layer/user.dto' 

const F = createFactory() 

export const usersGet = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services') 
    const users: UserDTO[] = await userService.getUsers(c=c) // DTO explicitly referenced
    return c.json(users)
})  

// userRoute.post('/', async (c) => {
//   const data = await c.req.json<NewUserDTO>()
//   const user: UserDTO = await service.createUser(data)
//   return c.json(user)
// })

// export const usersGetById = F.createHandlers(async (c: any) => {
//      const { userService } = c.get('services')
//      const users = await userService.findById(c.req.param('id'))  
//     return c.json(users)
// })

// // app.post('/api/users', zValidator('json', usersInsertSchema), async (c: any) => {
// export const usersPost = F.createHandlers(async (c: any) => {
//     const user = await c.req.json() // c.req.valid('json')
//      const { userService } = c.get('services')
//      const validatedUser = usersInsertSchema.safeParse(user)
//     if (!validatedUser.success) {
//      return c.json({ error: validatedUser.error }, 400)
//     } 
//     const users = await userService.create(validatedUser.data)  
//     return c.json(users) 
// })

// export const usersDelete = F.createHandlers(async (c) => {  
// })