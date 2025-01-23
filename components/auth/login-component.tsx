'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

// Define types for the errors and state
type Errors = Record<string, string>; // Replace 'string' with the expected error value type if more specific
type State = {
    status: boolean;
    message: string;
    errors: Errors;
};

export const LoginIdField = (props: {
    field_id?: string;
    field_name?: string;
    field_placeholder?: string;
    field_label?: string;
    state?: State;
}) => {
    return (
        <div>
            <Label htmlFor="staff_id" className="text-xs text-muted-foreground">
                {props.field_label ? props.field_label : 'Staff identification'}
            </Label>
            <Input
                className="bg-gray-100 border-none px-7 text-xs text-muted-foreground focus:ring-transparent focus-visible:ring-transparent placeholder:font-extralight placeholder:text-[10px]"
                name={props.field_name ? props.field_name : 'staff_id'}
                id={props.field_id ? props.field_id : 'staff_id'}
                placeholder={props.field_placeholder ? props.field_placeholder : "Input Staff identification here"}
            />

            {/* Uncomment and use this block if you plan to display error messages */}
            {/* <span className="h-1 text-xs text-destructive">
                {props.state?.errors && props.state.errors[props.field_name || '']}
            </span> */}
        </div>
    );
}

export const LoginPasswordField = (props: { state?: State }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
            <div className="grid grid-cols-1 grid-rows-0 place-items-center">
                <Input
                    className="col-span-full row-span-full bg-transparent border-none border-b-2 px-2 text-muted-foreground focus:ring-transparent focus-visible:ring-transparent placeholder:font-extralight placeholder:text-[10px] peer"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Input Password"
                />

                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`col-span-full row-span-full justify-self-end mr-5 hover:cursor-pointer transition-all opacity-50 peer-focus-within:opacity-100 peer-focus:opacity-100`}
                >
                    {
                        showPassword
                            ? <EyeIcon size={18} />
                            : <EyeOffIcon size={18} />
                    }
                </span>
            </div>

            <span className="h-1 text-xs text-destructive">
                {props.state?.errors?.password}
            </span>
        </div>
    );
}
