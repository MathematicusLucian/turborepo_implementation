import { Hono } from 'hono';
import { setHandlers } from './app-layer/router'
import { setMiddlewares } from './app-layer/middlewares' 

const app = new Hono();

setMiddlewares(app)
setHandlers(app)  

export default app;