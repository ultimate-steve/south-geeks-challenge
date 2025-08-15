import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Modal({isOpen, type, closeHandler, message}: Readonly<{ isOpen: boolean, type: string, closeHandler: (returnData?: any) => void, message?: string}>)
{
    return (
        <div className={`${isOpen ? "block" : "hidden"} fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                <div className="flex justify-end p-2">
                    <button onClick={closeHandler} type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div className="p-6 pt-0 text-center">
                    {type === "confirm" && <ExclamationCircleIcon className="w-20 h-20 text-red-600 mx-auto" />}
                    {type === "info" && <InformationCircleIcon className="w-20 h-20 text-cyan-600 mx-auto" />}
                    {type === 'loading' && <div className="flex justify-center items-center">
                        <svg className="animate-spin h-20 w-20 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" ></path> 
                        </svg>
                    </div>}
                    
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">{message}</h3>
                    {type === "confirm" &&
                        <div>
                            <button onClick={() => {closeHandler(true);}}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                Yes
                            </button>
                            <button onClick={() => {closeHandler(false);}}
                                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                data-modal-toggle="delete-user-modal">
                                No
                            </button>
                        </div>
                    }
                    {type === "info" &&
                        <div>
                            <button onClick={() => {closeHandler(true);}}
                                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                OK
                            </button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
