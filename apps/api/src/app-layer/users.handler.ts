import { createFactory } from 'hono/factory'  
import { UserDTO, NewUserDTO } from '../business-layer/user.dto' 

const F = createFactory() 

export const usersGet = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services') 
    const users: UserDTO[] = await userService.getAll(c) // DTO explicitly referenced
    return c.json(users)
})  

export const usersGetById = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services')
    const response = await userService.findById(c, c.req.param('id'))  
    return c.json(response)
})
 
export const createUser = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services')
    const newUser = await c.req.json()
    // const newUser = await c.req.json<any>() // NewUserDTO 
    // const newUser = c.req.valid('json')
    // const validatedUser = usersInsertSchema.safeParse(newUser)
    // if (!validatedUser.success) {
    //  return c.json({ error: validatedUser.error }, 400)
    // } 
    // const users: UserDTO = await userService.createUser(c, validatedUser.data)  
    const response: UserDTO = await userService.createUser(c, c.req.param('userData'))  
    return c.json(response) 
}) 

export const updateUser = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services')
    // const {id, userData} = await c.req.json()
    const response = await userService.update(c, c.req.param('id'), c.req.param('userData'))  
    return c.json(response)
})

export const usersDelete = F.createHandlers(async (c: any) => { 
    const { userService } = c.get('services')
    const response = await userService.delete(c, c.req.param('id'))  
    return c.json(response)
})