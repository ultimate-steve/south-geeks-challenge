import { apiPost, apiPut } from "@/util/api";
import Constraints from "@/util/constraints";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { UserInputs } from "./types/inputs";
import Modal from "../modal";
import { useState } from "react";

export function UserForm({ user }: { user?: any | null }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInputs>(
    {
        defaultValues: {
            name: user?.name || '',
            zipCode: user?.zipCode || ''
        },
    })
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoText, setInfoText] = useState('');

    const registerWithMask = useHookFormMask(register);
    const router = useRouter();

    const onSubmit: SubmitHandler<UserInputs> = async (data: UserInputs) =>
    {
        let response;
        setIsLoading(true);
        if(!user)
        {
            response = await apiPost(Constraints.USERS_URL, data);
        }
        else
        {
            response = await apiPut(`${Constraints.USERS_URL}/${user.id}`, data);
        }
        if(response?.status)
        {
            router.back();
        }
        else
        {
            setIsLoading(false);
            setInfoText(response.errors.join("\n"));
            setShowInfo(true);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 mx-4 items-center [grid-template-columns:max-content_1fr] lg:[grid-template-columns:max-content_1fr_max-content_1fr]">
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
                    <div className="contents">
                        <label htmlFor="name">Name <span className="text-red-600">*</span></label>
                        <div className="flex-grow pl-4">
                            <input className="w-full bg-white border-1 focus:border-gray-400 focus:outline-none border-gray-200 p-2 rounded" type="text" {...register("name", { required: true })} />
                            {errors.name && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="contents">
                        <label htmlFor="zipCode">Zip Code <span className="text-red-600">*</span></label>
                        <div className="flex-grow pl-4">
                            <input className="w-full bg-white border-1 focus:border-gray-400 focus:outline-none border-gray-200 p-2 rounded" type="text" {...registerWithMask("zipCode", ["99999"], { required: true, minLength: 5, jitMasking: true })} />
                            {errors.zipCode && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-4 flex justify-end">
                        <input className="px-4 py-2 w-1/1 md:w-auto bg-blue-600 text-white rounded-3xl hover:bg-blue-400 cursor-pointer" type="submit" />
                    </div>
                </div>
            </form>
            <Modal isOpen={showInfo} type="info" closeHandler={() => {setShowInfo(false);}} message={infoText}/>
            <Modal isOpen={isLoading} type="loading" closeHandler={() => {setIsLoading(false);}} message="Loading..."/>
        </div>
    );
}