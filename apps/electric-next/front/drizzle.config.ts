import { defineConfig } from "drizzle-kit";
// import { Config, defineConfig } from "drizzle-kit";
import { drizzleConfig } from "../drizzle.config";
export const migrationsFolder = `./front/migrations`;
// export const migrationsFolder = "./migrations";

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_BOUNCER_PORT } = process.env;

// export const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=disable`;
// // export const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`;

// export const drizzleConfig: Config = {
//   dialect: "postgresql",
//   schema: "./schema/*",
//   out: migrationsFolder,
//   dbCredentials: {
//     url: connectionString,
//   },
//   ...(process.env.DATABASE_DRIVER && { driver: process.env.DATABASE_DRIVER }),
//   verbose: true,
// };

export default defineConfig({
  ...drizzleConfig,
  schema: `./front/schema.ts`,
  out: migrationsFolder,
  verbose: true,
});
// export default defineConfig(drizzleConfig);