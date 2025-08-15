'use client';
import { useSelector, useDispatch } from "react-redux";
import UsersList from "@/components/users/list";
import { apiGet } from "@/util/api";
import Constraints from "@/util/constraints";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setRefreshUsers } from "@/store/usersSlice";

export default function UsersPage() {
  
  const [users, setUsers] = useState([]);
  const refreshUsers = useSelector((state: any) => state.users.refreshUsers);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    loadUsers();
  }, [])

  useEffect(() => {
    if(refreshUsers)
    {
      loadUsers();
      dispatch(setRefreshUsers(false));
    }
  }, [refreshUsers])

  const addUser = () => {
    router.push('/users/add');
  }

  const loadUsers = async () => {
    setUsers([]);
    const response = await apiGet(Constraints.USERS_URL);
    setUsers(response);
  }

  return (
    <div className="p-4 bg-[#eef4fd] min-h-(--height-without-header)">
      <div className="md:max-w-6/10 mx-auto">
        <div className="text-center">
          <span className="text-4xl text-gray-800">Users</span>
        </div>
        <div className="flex justify-end gap-2 my-4">
          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer" onClick={loadUsers}>Refresh</button> */}
          <button className="px-4 py-2 w-1/1 md:w-auto bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer" onClick={() => addUser()}>Add User</button>
        </div>
        <UsersList users={users} />
      </div>
    </div>
  );
}
