'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClientSession } from "@/hooks/useClientSession"
export default function CallbackPage() {
    const router = useRouter()
    const { session, sessionError } = useClientSession()

    useEffect(() => { if (session) router.push("/dashboard") }, [session])

    return (
        <div className="flex justify-center items-center flex-col relative bg-black h-screen">
            <div className="absolute w-[300px]  z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 right-[-50px] lg:top-2/4 lg:left-3/4 rounded-full  bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 lg:opacity-30 blur-3xl">
            </div>
            <div className="absolute w-[300px] z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 left-[-50px]  lg:top-20 lg:right-20 rounded-full  bg-gradient-to-r from-purple-200 to-blue-500  opacity-50 lg:opacity-30 blur-3xl"></div>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-300  animate-bounce blur-sm [animation-delay:.3s]"></div>
                <div className="w-4 h-4 blur-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-300  animate-bounce [animation-delay:.5s]"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-300  blur-sm animate-bounce [animation-delay:.7s]"></div>
            </div>
            <p className="text-sm opacity-75 text-slate-50 my-5">
                Redireccionando
            </p>
        </div>
    )
}

