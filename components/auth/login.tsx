'use client'


import Link from "next/link"
// import { useFormState } from "react-dom"

import { SubmitButton } from "@/components/ui/submit-button"
// import { LoginIdField, LoginPasswordField } from "./login"
// import { adminLoginAction } from "@/lib/actions/login"

const Login = () => {
    // const [state, dispatch] = useFormState(adminLoginAction, undefined)

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <div className="heading">
                <p className="font-inter text-[40px]  text-app-primary text-center">Log In</p>
                <p className="text-muted-foreground text-xs ">DON'T HAVEN AN ACCOUNT 
                    <a href="/signup"  className="text-sm font-medium text-app-primary hover:underline" >
                        Create One
                    </a>
                </p>
            </div>

            {/* <form action={dispatch} className="w-full space-y-4"> */}
            <form className="w-full space-y-4">
                {/* <LoginIdField state={state} field_name="admin_id" field_id="admin_id" field_label="Admin I.D" field_placeholder="Input Staff Identification here" />

                <LoginPasswordField state={state} /> */}

                <SubmitButton value="Confirm and Create" pendingValue="Processing..." className="w-full bg-chocolate hover:bg-chocolate/90" />
            </form>

            <div className="text-xs flex items-center justify-center gap-2">
                <p className="text-muted-foreground">Not an Admin?</p> <span className="text-muted-foreground">|</span> <Link href={'/login'}>Login Here with Assigned Credentials</Link>
            </div>
        </div>
    )
}

export { Login }
