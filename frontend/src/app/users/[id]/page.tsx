'use client'
import { User } from "@/components/users/types/user";
import { apiGet } from "@/util/api";
import Constraints from "@/util/constraints";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  
  const [user, setUser] = useState<User | null>(null);
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
    <div>
      {user && <div className="p-4 bg-[#eef4fd] min-h-(--height-without-header)">
        <div className="md:max-w-6/10 mx-auto bg-white rounded shadow p-4">
          <div className="text-center mb-8">
            <span className="text-4xl text-gray-800">{user.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:gap-y-8">
            <p className="col-span-3 text-center text-3xl text-gray-800">{user.zipCode}</p>
            <p className="col-span-3 md:col-span-1 text-center text-2xl">Latitude: {user.latitude}</p>
            <p className="col-span-3 md:col-span-1 text-center text-2xl">Longitude: {user.longitude}</p>
            <p className="col-span-3 md:col-span-1 text-center text-2xl">Timezone: {user.timezone}</p>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
