"use client"
// import { useDbLiveQuery } from "@/hooks/useDbLiveQuery";
// import { User } from "../../src/schema/users";
// import { faker } from '@faker-js/faker';
import { PGliteInterface } from "@electric-sql/pglite";
import { newUserService } from "../../src/services/users";
import List from "@/components/List";
import { useLiveQuery, usePGlite } from "@electric-sql/pglite-react";
import { ExtendedPGlite } from "~/providers/dataWorker";
import { useEffect } from "react";

//   getUsers: (where?: SQL) => SQL<User[]

export default function UsersPage() {
  let users: any[] = [{ id: 1, name: 'abc' }, { id: 2, name: 'def' }];
  // const users2 = useDbLiveQuery<any, { limit: number }>({ // User[]
  //   // a@ts-expect-error: avoid type check
  //   queryFn: (pgLiteCLient: PGliteInterface, extra: any): { toSQL: () => { sql: string; params: any[]; }; } => {
  //     const { getUsers }: any = newUserService(pgLiteCLient);
  //     return getUsers(); //.toSQL();
  //   },
  // });
  // console.log(users2);
  // useEffect(() => { 
  // }, []);
  let res: any = [];
  const db: PGliteInterface = usePGlite() as ExtendedPGlite;
  const defaultValue: any[] = [];
  if (!db?._db) {
    res = [];
  }
  const { getUsers }: any = newUserService(db);
  console.log(getUsers);
  const sql = getUsers;
  // const { sql, params } = queryFn(pgLiteCLient._pgLiteCLient, data as E).toSQL();
  // const sql = ` SELECT * FROM my_table WHERE number <= $1 ORDER BY number; `
  // const maxNumber = 1;
  console.log(sql);
  const params: any[] = [];
  // const params = [maxNumber]
  res = useLiveQuery<any>(sql, params);
  // res?.rows as any || [];
  console.log(res);

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start h-screen">
        Users Page
        <hr />
        {users?.map((user) =>
          <List key={user.id} user={user} />
        )}
      </main>
    </div>
  );
}