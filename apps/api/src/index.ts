// import 'dotenv/config'
import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator';
import { db, schema } from '@repo/db-adapter';
import { newUserService } from '@repo/db-adapter/services/users';
import { usersInsertSchema } from '@repo/db-adapter/schema/users';
import postgres from "postgres";

const app = new Hono();
app.use('/api/*', cors())

const databaseConnection = (env: any) => {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_BOUNCER_PORT } = env;
    const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;
    const dbAdapter = db(poolConnectionString);
    return newUserService(dbAdapter);
}

app.get('/', (c) => {
    return c.json({ message: 'Use the /api prefix' })
});

app.get('/api', (c) => {
    return c.json({ message: 'Welcome to the API' })
});

app.get('/api/users', async (c: any) => {
    const { getUsers, getUserById, createUser } = databaseConnection(c.env);
    const users = await getUsers();
    return c.json(users);
});

app.get('/api/users/:id', async (c) => {
    const { getUsers, getUserById, createUser } = databaseConnection(c.env);
    const user = await getUserById(c.req.param('id'));
    return c.json(user)
});

app.post('/api/users', zValidator('json', usersInsertSchema), async (c) => {
    const data = c.req.valid('json')
    const { getUsers, getUserById, createUser } = databaseConnection(c.env);
    const user = await createUser(data);
    return c.json(user)
});

app.get('/api/posts', async (c) => {
    //     const { getUsers, getUserById, createUser } = databaseConnection(c.env);
    //     const posts = await db.select().from(schema.posts);
    //     return c.json(posts)
    return c.json({})
});

export default app;