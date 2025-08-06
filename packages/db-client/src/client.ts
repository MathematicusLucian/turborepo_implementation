import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg'

export const queryClient = (poolConnectionString: any, maxClients: any) => new pg.Pool({
  connectionString: poolConnectionString,
  ssl: process.env.PG_SSL_REQUIRE === 'true' ? true : undefined,
  max: Number(maxClients) || 10,
});

export const dbClient = (poolConnectionString: any, maxClients: any, schema: any) => drizzle(queryClient(poolConnectionString, maxClients), { schema });
export default dbClient;