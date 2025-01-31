'use client'
import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import InputField from '@/components/ui/InputField';
import TransformingLineLink from "../ui/animation-link";
import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/actions/login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

const ResetPaswordComponent = () => {
    const [state, dispatch] = useFormState(resetPassword, undefined);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success);
            redirect("/login");
        }
        if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state]);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        if (newPassword !== confirmPassword) {
            event.preventDefault();
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }
        setError("");
    };

    return (
        <>
            <div className="heading">
                <p className="font-bold text-3xl text-app-primary text-center">Recover Your Account</p>
                <p className="text-center text-xs space-x-2 mt-3">
                    <span className="text-muted text-center text-sm text-bold text-gray-400">Enter Your New Password.</span>
                </p>
            </div>

            <form className="w-full space-y-6" action={dispatch} onSubmit={handleSubmit}>
                <InputField
                    id="newPassword"
                    type="password"
                    label="NEW PASSWORD"
                    name="newPassword"
                    placeholder="********"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                    id="confirmPassword"
                    type="password"
                    label="CONFIRM PASSWORD"
                    name="confirmPassword"
                    placeholder="********"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <SubmitButton value="LOG IN" pendingValue="Processing..." className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2" />
                <TransformingLineLink href="moreInfo" text="DONT HAVE ACCESS TO ACCOUNT?" />
            </form>
        </>
    );
    
};

export { ResetPaswordComponent };
