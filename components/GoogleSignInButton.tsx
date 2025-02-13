import React, { useState } from "react";
import { useAuth } from "../lib/auth";
import { Button } from "@/components/ui/button";
import { GogleIcon } from "@/components/svg/gogle-icon";
import { googleLoginAction } from "@/lib/actions/login";

const GoogleSignInButton: React.FC = () => {
    const { signInWithGoogle, user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true); // Start loading
        try {
            const result = await signInWithGoogle();
            if (!result.email) {
                console.error("No email returned from Google authentication.");
                return;
            }
            await googleLoginAction(result.email);
        } catch (error) {
            console.error("Failed to sign in:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSignOut = async () => {
        setLoading(true); // Start loading
        try {
            await signOut();
        } catch (error) {
            console.error("Failed to sign out:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            {!user ? (
                <Button
                    onClick={handleSignIn}
                    disabled={loading} // Disable button when loading
                    className="w-full h-12 mt-2 rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    {loading ? (
                        <span className="animate-pulse">Signing in...</span> // Show loading text
                    ) : (
                        <>
                            <GogleIcon className="size-8" />
                            Sign in with Google
                        </>
                    )}
                </Button>
            ) : (
                <Button
                    onClick={handleSignOut}
                    disabled={loading} // Disable button when loading
                    className="w-full h-12 mt-2 rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    {loading ? (
                        <span className="animate-pulse">Signing out...</span> // Show loading text
                    ) : (
                        "Sign Out"
                    )}
                </Button>
            )}
        </div>
    );
};

export default GoogleSignInButton;
