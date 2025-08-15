'use client';
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const path = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div className="sticky w-full top-0 bg-white">
            <div className="grid grid-cols-3 md:grid-cols-1 items-center h-20 md:h-30">
                <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="mx-4 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                    <Bars3Icon className="text-blue-600 size-10" />
                </button>

                <div className="col-span-2 md:col-span-1 flex justify-end p-4">
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                        <Image src="/assets/img/logo.png" alt="Logo" width={100} height={100} />
                    </Link>
                </div>
            </div>
            <div className={`grid grid-cols-1 md:block ${ menuOpen ? "block" : "hidden" }`}>
                <div className={`w-full flex flex-col p-4 md:border-t-1 md:border-blue-300 bg-white h-full ${ menuOpen ? "h-screen" : "" }`} >
                    <ul className={`w-full md:flex gap-4 ${ menuOpen ? "block" : "hidden" }`} >
                        <li className="w-full md:w-auto m-4 md:m-0">
                            <Link href="/" onClick={() => setMenuOpen(false)} className={`${ path === "/" ? "text-blue-600 " : "" } uppercase`} >Home</Link>
                        </li>
                        <li className="w-full md:w-auto m-4 md:m-0"> 
                            <Link href="/users" onClick={() => setMenuOpen(false)} className={`${ path.indexOf("/users") > -1  ? "text-blue-600 " : "" } uppercase`} >Users</Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}