// import { newUserService } from "db/services/users";
// import { useDbLiveQuery } from "@/hooks/useDbLiveQuery";
// import { User } from "db/schema/users";
// import { useLiveQuery } from "@electric-sql/pglite-react";
// import { faker } from '@faker-js/faker';
import List from "@/components/List";

export default function UsersPage() {
  const users: any[] = [{ id: 1, name: 'abc' }, { id: 2, name: 'def' }];

  //   const users = useDbLiveQuery<User[], { limit: number }>({
  //     queryFn: (db, extra) => {
  //       const { getUsers } = newUserService(db);
  //       return getUsers()//.limit(extra.limit);
  //     },
  //     //data: { limit: 10 },
  //   });

  //   const data = useLiveQuery<User>(`select * from users limit $1`, [10]);
  //   const users2 = data?.rows || [];

  //   const createUser = async () => {
  //     try {
  //       const response = await fetch('/api/users', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ name: faker.person.fullName() }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to create user');
  //       }

  //       const user = await response.json();
  //       console.log('User created:', user);
  //       // Optionally, you can update the local state or trigger a refetch of the users list here
  //     } catch (error) {
  //       console.error('Error creating user:', error);
  //     }
  //   };

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start h-screen">
        Users Page
        <hr />
        {users?.map((user) =>
          <List user={user} />
        )}
      </main>
    </div>
  );
}