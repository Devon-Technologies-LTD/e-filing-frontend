
import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from '@/components/ui/button';
import { GogleIcon } from '@/components/svg/gogle-icon';
import TransformingLineLink from "../ui/animation-link";
import { LoginAction } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import { LoginPasswordField } from "./login-component";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LoginComponent = () => {
    const [state, dispatch] = useFormState(LoginAction, undefined);
    // if (state?.message) {
    //     toast.error(state.message, { autoClose: 3000 });
    // }
    return (
        <>
            <div className="heading">
                <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
                <p className="text-center text-xs space-x-2 mt-3">
                    <span className="text-muted text-gray-400">DON&apos;T HAVE AN ACCOUNT?</span>
                    <span>
                        <Link href="/signup" className="text-sm font-extrabold text-app-primary hover:none">
                            Create One
                        </Link>
                    </span>
                </p>
            </div>
            <form action={dispatch} className="w-full space-y-6">
                <LoginIdField state={state} field_id="email" field_label="Staff id" field_name="email" field_placeholder="Input Staff identification here" />
                {/* <InputField state={state} id="email" type="email" label="EMAIL ADDRESS" name="email" placeholder="name@gmail.com" required /> */}
                <LoginPasswordField state={state} />
                <p className="text-xs text-red-500 h-2 text-center">{state && state?.message}</p>
                <SubmitButton
                    value="LOG IN"
                    pendingValue="Processing..."
                    className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
                />
                <div className="text-center text-gray-400 my-6">
                    OR
                </div>
                <Button className="w-full border-app-primary border-2 hover:bg-gray-300/90 text-black h-12 rounded mt-2">
                    <GogleIcon className="size-8" />
                    Continue with Google
                </Button>
                <TransformingLineLink href="forgot" text="CAN'T LOG IN" />
            </form>
        </>
    );
};
export default LoginComponent;

const LoginIdField = (props:
    {
        field_id?: string;
        field_name?: string;
        field_placeholder?: string;
        field_label?: string;
        state?: {
            status: any;
            message: any;
            errors: any;
        }
    }
) => {
    return (
        <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground">{props.field_label ? props.field_label : 'Staff identification'}</Label>
            <Input
                className="bg-gray-100 border-none px-7 text-xs text-muted-foreground focus:ring-transparent focus-visible:ring-transparent placeholder:font-extralight placeholder:text-[10px]"
                name={props.field_name ? props.field_name : 'email'} id={props.field_id ? props.field_id : 'email'}
                placeholder={props.field_placeholder ? props.field_placeholder : "Input Email identification here"}
            />

            <span className="h-1 text-xs text-destructive">
                {props.state?.errors && props.state.errors[`${props.field_name}`]}
            </span>
        </div>
    )
}
