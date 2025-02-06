import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { GogleIcon } from "@/components/svg/gogle-icon";
import TransformingLineLink from "../ui/animation-link";
import { LoginAction } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import { LoginPasswordField } from "./login-component";
import InputField from "../ui/InputField";

const LoginComponent = () => {
  const [state, dispatch] = useFormState(LoginAction, undefined);
  return (
    <>
      <div className="heading">
        <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
        <p className="text-center text-xs space-x-2 mt-3">
          <span className="text-muted text-gray-400">
            DON&apos;T HAVE AN ACCOUNT?
          </span>
          <span>
            <Link
              href="/signup"
              className="text-sm font-extrabold text-app-primary hover:none"
            >
              Create One
            </Link>
          </span>
        </p>
      </div>
      <form action={dispatch} className="w-full space-y-6">
        <InputField
          id="email"
          type="email"
          label="EMAIL ADDRESS"
          name="email"
          placeholder="name@gmail.com"
          required
        />
        <LoginPasswordField />
        <p className="text-xs text-red-500 h-2 text-center">
          {state && state?.message}
        </p>

        <SubmitButton
          value="LOG IN"
          pendingValue="Processing..."
          className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
        />
        <div className="text-center text-gray-400 my-6">OR</div>
        <Button className="w-full  hover:bg-app-secondary/90  text-white h-12 rounded mt-2">
          <GogleIcon className="size-8" />
          Continue with Google
        </Button>
        <TransformingLineLink href="forgot" text="CAN'T LOG IN" />
      </form>
    </>
  );
};
export default LoginComponent;
