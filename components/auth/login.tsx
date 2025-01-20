import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import InputField from '@/components/ui/InputField';
import { Button } from '@/components/ui/button';
import { GogleIcon } from '@/components/svg/gogle-icon';
import TransformingLineLink from "../ui/animation-link";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/cases');
    };
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

            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <InputField
                    id="username"
                    type="email"
                    label="EMAIL ADDRESS"
                    name="username"
                    placeholder="name@gmail.com"
                    required
                />
                <InputField
                    id="password"
                    type="password"
                    label="PASSWORD"
                    name="password"
                    placeholder="PASSWORD"
                    required
                />
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
