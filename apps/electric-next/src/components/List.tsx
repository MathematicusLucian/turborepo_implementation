"use client";
interface ListProps {
  user: any;
}
const List = ({ user }: ListProps) => {

  return (
    <div className="flex items-center justify-center my-6 w-full">

      {user
        ? (<div>
          {/* 
          <button
            className="bg-blue-700 hover:bg-blue-600 text-slate-100 font-bold py-2 px-4 rounded"
            onClick={createUser}>
            Create User
          </button>
          */}

          <div className="flex flex-col gap-2 mb-6">
            {/* <div className="flex flex-row items-center justify-around mb-6 w-full"> */}
            <div key={user.id}>{user.name}</div>
          </div>

        </div>)

        : (<p>No data</p>)}
    </div>)
};

export default List;