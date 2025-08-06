export { PgDialect } from 'drizzle-orm/pg-core';
import { drizzle as PgLiteDrizzle } from "drizzle-orm/pglite";
import * as schema from '../src/schema';
export { schema };
import migrations from "../migrations/export.json";
export const frontMigrations = migrations;

export const createPgLiteClient = (client: any) => {
    return PgLiteDrizzle(client, {
        schema,
    });
};

export * as users from "../src/services/users";
export default createPgLiteClient;