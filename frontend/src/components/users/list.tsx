'use client';
import { UserCard } from "./card";
import { User } from "./types/user";

export default function UsersList({users}: Readonly<{ users: User[]}>) {

    return (
        <div className="my-4 lg:my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {users.length > 0 ? users.map((user: any) => (
                    <UserCard key={user.id} user={user} />
                )) :
                <UserCard user={null}/>}
            </div>
        </div>
    );
}