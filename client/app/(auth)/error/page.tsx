"use client"

import { useRouter, useSearchParams } from "next/navigation"

enum Error {
    Configuration = "Configuration",
}

const errorMap = {
    [Error.Configuration]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-rose-100 text-rose-600 p-2 text-xs">Configuration</code>
        </p>
    ),
}

export default function AuthErrorPage(props: any) {
    console.log({ props })
    const search = useSearchParams()
    const error = search.get("error") as Error
    const router=useRouter()

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <a
                onClick={()=>router.back()}
                href="#"
                className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Something went wrong
                </h5>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    {errorMap[error] || "Please contact us if this error persists."}
                </div>
            </a>
        </div >

    )
}