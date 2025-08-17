import * as schema from "../persistence-layer/schema";
import { newUserService } from '../business-layer/services/users.service';
import { usersInsertSchema } from '../persistence-layer/schema/users'; 
import { dbClient } from '@repo/db-client';
// import { poolConnectionString } from "./drizzle.config";

export const databaseConnection = (env: any) => {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_BOUNCER_PORT, PG_MAX_CLIENTS } = env;
    const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;
    const maxClients = Number(PG_MAX_CLIENTS) || 10;
    return dbClient(poolConnectionString, maxClients, schema);
}