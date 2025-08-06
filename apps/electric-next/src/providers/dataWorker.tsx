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
    }

    useEffect(() => {
        if (pg) return;
        setPglite();
    }, [pg]);

    if (!pg) return <div>Loading</div>;

    return (
        <div>
            {/* <PGliteProvider db={pg}> */}
            {children}
            {/* </PGliteProvider> */}
        </div>
    );
} 