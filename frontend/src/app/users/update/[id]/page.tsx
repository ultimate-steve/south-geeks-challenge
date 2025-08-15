'use client';
import { UserForm } from "@/components/users/form";
import { apiGet } from "@/util/api";
import Constraints from "@/util/constraints";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {

  const [user, setUser] = useState<Object | null>(null);
  const params = useParams<{ id: string}>();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [params.id]);
  
  const fetchUser = async () => {
    const response = await apiGet(`${Constraints.USERS_URL}/${params.id}`);
    if(!response.status)
    {
      router.back();
    }
    setUser(response.data);
  };

  return (
    <div className="p-4 bg-[#eef4fd] min-h-(--height-without-header)">
      <div className="md:max-w-6/10 mx-auto bg-white rounded shadow p-4">
        <div className="text-center mb-4 md:mb-8">
          <span className="text-4xl text-gray-800">Edit User</span>
        </div>
        {user && <UserForm user={user}/>}
      </div>
    </div>
  );
}
