import { createFactory } from 'hono/factory'  
import { UserDTO } from '../business-layer/user.dto' 

export class UserService { 
    honoFactory: any;
    
    constructor(honoFactory: any) {
        this.honoFactory = honoFactory || createFactory()  
    } 

    // GET: http://127.0.0.1:3003/api/v1/user/all
    usersGet(): any {
        return this.honoFactory.createHandlers(async (c: any) => { 
            const { userService } = c.get('services') 
            const users: UserDTO[] = await userService.getAll(c) // DTO explicitly referenced
            return c.json(users)
        })  
    }

    // GET: http://127.0.0.1:3003/api/v1/user/1
    usersGetById(): any {
        return this.honoFactory.createHandlers(async (c: any) => { 
            const { userService } = c.get('services')
            const response = await userService.findById(c, c.req.param('id'))  
            return c.json(response)
        })
    }

    // POST: http://127.0.0.1:3003/api/v1/user/create
    // {
    //   "name": "Johnny MacSmith"
    // }
    createUser(): any {
        return this.honoFactory.createHandlers(async (c: any) => { 
            const { userService } = c.get('services')
            const newUserData = await c.req.json()
            // const validatedUser = usersInsertSchema.safeParse(newUser)
            // if (!validatedUser.success) {
            //  return c.json({ error: validatedUser.error }, 400)
            // } 
            const response: UserDTO = await userService.create(c, newUserData) // validatedUser.data)  
            return c.json(response) 
        })
    }

    // POST: http://127.0.0.1:3003/api/v1/user/update/3
    // {
    //   "name": "Tom MacSmith"
    // }
    updateUser(): any {
        return this.honoFactory.createHandlers(async (c: any) => { 
            const { userService } = c.get('services')
            const updatedUserData = await c.req.json()
            const response = await userService.update(c, c.req.param('id'), updatedUserData)  
            return c.json(response)
        })
    }

    // DELETE: http://127.0.0.1:3003/api/v1/user/delete/3
    usersDelete(): any {
        return this.honoFactory.createHandlers(async (c: any) => { 
            const { userService } = c.get('services')
            const response = await userService.delete(c, c.req.param('id'))  
            return c.json(response)
        })
    }
}