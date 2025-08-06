"use client"
import React, { useState, useEffect } from "react";
import { IdbFs, PGlite, PGliteInterface } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react"
import { electricSync } from "@electric-sql/pglite-sync";
import { vector } from "@electric-sql/pglite/vector";
import { worker, PGliteWorker } from '@electric-sql/pglite/worker'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_BOUNCER_PORT } = process.env;
export const poolConnectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${PG_BOUNCER_PORT}/${POSTGRES_DB}?sslmode=disable`; // /electric ??
console.log('POSTGRES_DB', POSTGRES_DB);
console.log('electricBaseUrl', poolConnectionString);

export function DataWorkerProvider({ children }: { children: React.ReactNode }): React.ReactNode {
    const [pg, setPg] = useState<PGliteInterface>();

    const setPglite = async () => {
        const debug = 1;

        const pglite = await PGliteWorker.create(
            new Worker(new URL('../workers/pgliteWorker.ts', import.meta.url), {
                type: 'module',
            }),
            {
                meta: {
                    dbName: POSTGRES_DB,
                    electricBaseUrl: poolConnectionString,
                },
                relaxedDurability: true,
                dataDir: 'memory://',
                extensions: {
                    live,
                    vector,
                },
                debug
            }
        );
        // console.log('pglite', pglite);

        //     const _postgres_db = await runMigrations(pglite, POSTGRES_DB);
        //     Object.defineProperty(pglite, '_postgres_db', {
        //       value: _postgres_db,
        //       writable: false,
        //     });

        setPg(pglite);

        // pg.live.query(
        // pglite.live.incrementalQuery(`SELECT * FROM users`, [], 'id', (data) => {
        // pglite.live.incrementalQuery(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`, [], 'table_name', (data) => {
        // pglite.live.incrementalQuery(`SELECT * FROM INFORMATION_SCHEMA.TABLES`, [], 'table_name', (data) => {
        //         pglite.live.incrementalQuery( // query
        //             `SELECT * FROM information_schema.tables 
        //    WHERE table_schema = 'public' 
        //    AND table_name = 'users'`,
        //             [],
        //             'table_name',
        //             (data) => {
        //                 console.log(JSON.stringify(data.rows, null, 2))
        //             }
        //         )
    }

    useEffect(() => {
        if (pg) return;
        setPglite();
    }, [pg]);

    if (!pg) return <div>Loading</div>;

    return (
        <div>
            <PGliteProvider
                // @ts-expect-error: avoid type check
                db={pg}
            >
                {children}
            </PGliteProvider>
        </div>
    );
}

export interface ExtendedPGlite extends PGliteInterface {
    _db?: PGliteInterface;
}