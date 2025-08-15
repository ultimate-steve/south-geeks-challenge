'use client';
import { EyeIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { User } from "./types/user";
import { useRouter } from "next/navigation";
import Constraints from "@/util/constraints";
import { apiDelete } from "@/util/api";
import { setRefreshUsers } from "@/store/usersSlice";
import { useDispatch } from "react-redux";
import Modal from "../modal";
import { useState } from "react";

export function UserCard({user}: Readonly<{ user: User | null}>) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [confirmUserDel, setConfirmUserDel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const viewUser = (id: string) => {
        router.push(`/users/${id}`);
    }

    const editUser = (id: string) => {
        router.push(`/users/update/${id}`);
    }

    const deleteUser = async (id: string) => {
        const response = await apiDelete(`${Constraints.USERS_URL}/${id}`);
        if(response.status)
        {
            dispatch(setRefreshUsers(true));
        }
    }

    const delClick = () => {
        setConfirmUserDel(true);
    }

    const onConfirmUserDel = async (response: boolean) => {
        setConfirmUserDel(false);
        if(response && user?.id)
        {
            setIsLoading(true);
            await deleteUser(user.id);
            setIsLoading(false);
        }
    }

    return (
        <div>
            {user ?
                <div className="shadow-lg rounded-lg bg-white p-4">
                    <div className="text-center mb-4"><span className="font-bold text-3xl">{user.name}</span></div>
                    <div className="text-center mb-4"><span className="text-sm text-gray-500">ID: {user.id}</span></div>
                    <div className="text-center mb-4"><span className="text-2xl">{user.zipCode}</span></div>
                    <div className="grid grid-cols-3 place-items-center gap-4 mt-8">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer w-1/1 flex justify-center"><EyeIcon className="size-6" onClick={() => viewUser(user.id)}/></button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer w-1/1 flex justify-center"><PencilIcon className="size-6" onClick={() => editUser(user.id)}/></button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer w-1/1 flex justify-center"><XMarkIcon className="size-6" onClick={() => delClick()}/></button>
                    </div>
                </div>
            :
                <div className="shadow-lg rounded-lg bg-white p-4 animate-pulse">
                    <div className="text-center mb-4 bg-gray-400 rounded-full dark:bg-gray-600 h-10"></div>
                    <div className="text-center mb-4 bg-gray-200 rounded-full dark:bg-gray-500 h-5"></div>
                    <div className="text-center mb-4 bg-gray-400 rounded-full dark:bg-gray-600 h-7"></div>
                    <div className="grid grid-cols-3 place-items-center gap-4 mt-8">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 w-1/1 flex justify-center h-10"></button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 w-1/1 flex justify-center h-10"></button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-400 w-1/1 flex justify-center h-10"></button>
                    </div>
                </div>
            }
            <Modal isOpen={confirmUserDel} type="confirm" closeHandler={onConfirmUserDel} message="Do you want to delete this user?"/>
            <Modal isOpen={isLoading} type="loading" closeHandler={() => {setIsLoading(false);}} message="Loading..."/>
        </div>
    );
}