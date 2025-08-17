import { users } from '../persistence-layer/orm-schema'
import { dbClient, dbDrizzleClient } from '@repo/db-client'

export const databaseConnection = (env: any) => {
    const { 
        POSTGRES_USER, 
        POSTGRES_PASSWORD, 
        POSTGRES_HOST, 
        PG_BOUNCER_PORT, 
        POSTGRES_DB, 
        PG_MAX_CLIENTS,
        PG_SSL_REQUIRE
    } = env;
    const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;
    const maxClients = Number(PG_MAX_CLIENTS) || 10;

    const pool = dbClient(poolConnectionString, maxClients, users);
    const drizzlePool = dbDrizzleClient(poolConnectionString, maxClients, users);
    return { pool, drizzlePool };
}