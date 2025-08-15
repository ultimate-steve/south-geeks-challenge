'use client';
import { UserForm } from "@/components/users/form";

export default function AddUserPage() {

  return (
    <div className="p-4 bg-[#eef4fd] min-h-(--height-without-header)">
      <div className="md:max-w-6/10 mx-auto bg-white rounded shadow p-4">
        <div className="text-center mb-4 md:mb-8">
          <span className="text-4xl text-gray-800">Add User</span>
        </div>
        <UserForm/>
      </div>
    </div>
  );
}
