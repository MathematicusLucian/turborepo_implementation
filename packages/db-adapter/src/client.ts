import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg'
import * as schema from "./schema";
// import { poolConnectionString } from "./drizzle.config";

const { PG_MAX_CLIENTS } = process.env;

// console.log('\n\env\n', env);
// console.log('\n\process\n', process);
// console.log('\n\npoolConnectionString\n', poolConnectionString);

export const queryClient = (poolConnectionString: any) => new pg.Pool({
  connectionString: poolConnectionString,
  ssl: process.env.PG_SSL_REQUIRE === 'true' ? true : undefined,
  max: Number(PG_MAX_CLIENTS) || 10,
});

export const db = (poolConnectionString: any) => drizzle(queryClient(poolConnectionString), { schema });
export default db;