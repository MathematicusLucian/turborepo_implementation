import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator';
import { db, schema } from '@repo/db-adapter';
import { newUserService } from '@repo/db-adapter/services/users';
import { usersInsertSchema } from '@repo/db-adapter/schema/users';

const databaseConnection = (env: any) => {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_BOUNCER_PORT } = env;
    const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;
    return db(poolConnectionString);
}

const app = new Hono();
app.use('/api/*', cors())

app.get('/', (c: any) => {
    return c.json({ message: 'Use the /api prefix' })
});

app.get('/api', (c: any) => {
    return c.json({ message: 'Welcome to the API' })
});

app.get('/api/users', async (c: any) => {
    const dbAdapter = databaseConnection(c.env);
    const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const users = await getUsers();
    return c.json(users);
});

app.get('/api/users/:id', async (c) => {
    const dbAdapter = databaseConnection(c.env);
    const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const user = await getUserById(c.req.param('id'));
    return c.json(user)
});

app.post('/api/users', zValidator('json', usersInsertSchema), async (c: any) => {
    const data = c.req.valid('json')
    const dbAdapter = databaseConnection(c.env);
    const { getUsers, getUserById, createUser } = newUserService(dbAdapter);
    const user = await createUser(data);
    return c.json(user)
});

app.get('/api/posts', async (c: any) => {
    const dbAdapter = databaseConnection(c.env);
    // const { getPosts, getPostById, createPost } = newPostService(dbAdapter);
    // const posts = await getPosts();
    // return c.json(posts)
    return c.json({})
});

export default app;