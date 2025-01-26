// import Link from "next/link";
// import { SubmitButton } from "@/components/ui/submit-button";
// import InputField from "@/components/ui/InputField";
// import { Button } from "@/components/ui/button";
// import { GogleIcon } from "@/components/svg/gogle-icon";
// import TransformingLineLink from "../ui/animation-link";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema, LoginFormData } from "@/lib/validations/loginSchema";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const LoginComponent = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm<LoginFormData>({
//         resolver: zodResolver(loginSchema),
//     });

//     const router = useRouter();
//     const [isPasswordVisible] = useState(false);

//     const onSubmit = async (data: LoginFormData) => {
//         try {
//             const response = await fetch("/api/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 router.push("/dashboard");
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.message || "Login failed");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             toast.error("An unexpected error occurred");
//         }
//     };

//     return (
//         <>
//             <div className="heading">
//                 <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
//                 <p className="text-center text-xs space-x-2 mt-3">
//                     <span className="text-muted text-gray-400">
//                         DON&apos;T HAVE AN ACCOUNT?
//                     </span>
//                     <span>
//                         <Link
//                             href="/signup"
//                             className="text-sm font-extrabold text-app-primary hover:none"
//                         >
//                             Create One
//                         </Link>
//                     </span>
//                 </p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
//                 <div>
//                     <InputField
//                         id="email"
//                         type="email"
//                         label="EMAIL ADDRESS"
//                         placeholder="name@gmail.com"
//                         {...register("email")}
//                         error={errors.email?.message}
//                     />
//                 </div>

//                 <div>
//                     <InputField
//                         id="password"
//                         type={isPasswordVisible ? "text" : "password"}
//                         label="PASSWORD"
//                         placeholder="PASSWORD"
//                         {...register("password")}
//                         error={errors.password?.message}
//                     />
//                 </div>

//                 <SubmitButton
//                     value="LOG IN"
//                     pendingValue="Processing..."
//                     className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
//                     loading={isSubmitting}
//                 />

//                 <div className="text-center text-gray-400 my-6">OR</div>

//                 <Button className="w-full border-app-primary border-2 hover:bg-gray-300/90 text-black h-12 rounded mt-2">
//                     <GogleIcon className="size-8" />
//                     Continue with Google
//                 </Button>

//                 <TransformingLineLink href="forgot" text="CAN'T LOG IN" />
//             </form>
//         </>
//     );
// };

// export default LoginComponent;


import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import InputField from '@/components/ui/InputField';
import { Button } from '@/components/ui/button';
import { GogleIcon } from '@/components/svg/gogle-icon';
import TransformingLineLink from "../ui/animation-link";
import { LoginAction } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import { LoginPasswordField } from "./login-component";

const LoginComponent = () => {
    const [state, dispatch] = useFormState(LoginAction, undefined);

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
                <InputField id="email" type="email" label="EMAIL ADDRESS" name="email" placeholder="name@gmail.com" required />
                <LoginPasswordField />
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



// import Link from "next/link";
// import { SubmitButton } from "@/components/ui/submit-button";
// import InputField from '@/components/ui/InputField';
// import { Button } from '@/components/ui/button';
// import { GogleIcon } from '@/components/svg/gogle-icon';
// import TransformingLineLink from "../ui/animation-link";
// import { useRouter } from "next/navigation";

// const LoginComponent = () => {
//     const router = useRouter();
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         router.push('/cases');
//     };
//     return (
//         <>
//             <div className="heading">
//                 <p className="font-bold text-3xl text-app-primary text-center">Log In</p>
//                 <p className="text-center text-xs space-x-2 mt-3">
//                     <span className="text-muted text-gray-400">DON&apos;T HAVE AN ACCOUNT?</span>
//                     <span>
//                         <Link href="/signup" className="text-sm font-extrabold text-app-primary hover:none">
//                             Create One
//                         </Link>
//                     </span>
//                 </p>
//             </div>

//             <form onSubmit={handleSubmit} className="w-full space-y-6">
//                 <InputField
//                     id="username"
//                     type="email"
//                     label="EMAIL ADDRESS"
//                     name="username"
//                     placeholder="name@gmail.com"
//                     required
//                 />
//                 <InputField
//                     id="password"
//                     type="password"
//                     label="PASSWORD"
//                     name="password"
//                     placeholder="PASSWORD"
//                     required
//                 />
//                 <SubmitButton
//                     value="LOG IN"
//                     pendingValue="Processing..."
//                     className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
//                 />
//                 <div className="text-center text-gray-400 my-6">
//                     OR
//                 </div>
//                 <Button className="w-full border-app-primary border-2 hover:bg-gray-300/90 text-black h-12 rounded mt-2">
//                     <GogleIcon className="size-8" />
//                     Continue with Google
//                 </Button>

//                 <TransformingLineLink href="forgot" text="CAN'T LOG IN" />
//             </form>

//         </>

//     );
// };

// export default LoginComponent;

