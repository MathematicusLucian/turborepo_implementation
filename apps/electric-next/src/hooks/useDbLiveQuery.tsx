import { useLiveQuery, usePGlite } from "@electric-sql/pglite-react";
import { PGliteInterface } from "@electric-sql/pglite";
import { ExtendedPGlite } from "@/providers/dataWorker";

// usePgLiteClient
export const useDbLiveQuery = <T, E = undefined>({ queryFn, data, defaultValue = null }: {
    queryFn: (db: PGliteInterface, data: E) => { toSQL: () => { sql: string; params: any[] } },
    data?: E,
    defaultValue?: T | null
}) => {
    const db = usePGlite() as ExtendedPGlite;
    if (!db?._db) {
        return defaultValue;
    }
    const { sql, params } = queryFn(db._db, data as E).toSQL();

    // function useLiveQuery<T = { [key: string]: unknown }>(
    //     query: string,
    //     params: unknown[] | undefined | null,
    // ): Results<T>
    // const maxNumber = 100 
    // useLiveIncrementalQuery
    // const res = useLiveQuery(` SELECT * FROM my_table WHERE number <= $1 ORDER BY number; `, [maxNumber])
    const res = useLiveQuery<T>(sql, params);
    return res?.rows as T || defaultValue;
}