import { createFactory } from 'hono/factory' 
import { databaseConnection } from '../data-layer/db'; 
// import { newUserService } from '../business-layer/services/users.service';
import { usersInsertSchema } from '../persistence-layer/schema/users'; 

const F = createFactory()

export const usersGet = F.createHandlers(async (c: any) => {
    // const dbAdapter = databaseConnection(c.env);
    const { userService } = c.get('services')
    // const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const users = await userService.findAll() // getUsers();
    return c.json(users); 
})

export const usersGetById = F.createHandlers(async (c: any) => {
    // const dbAdapter = databaseConnection(c.env);
    const { userService } = c.get('services')
    // const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const users = await userService.findById(c.req.param('id')) // getUserById(c.req.param('id')); 
    return c.json(users)
})

// app.post('/api/users', zValidator('json', usersInsertSchema), async (c: any) => {
export const usersPost = F.createHandlers(async (c: any) => {
    const user = await c.req.json() // c.req.valid('json')
    // const dbAdapter = databaseConnection(c.env);
    const { userService } = c.get('services')
    // const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const validatedUser = usersInsertSchema.safeParse(user)
    if (!validatedUser.success) {
     return c.json({ error: validatedUser.error }, 400)
    } 
    const users = await userService.create(validatedUser.data) // createUser(user);
    return c.json(users) 
})

export const usersDelete = F.createHandlers(async (c) => {  
})