import React, { useState } from "react";
import { useAuth } from "../lib/auth";
import { Button } from "@/components/ui/button";
import { GogleIcon } from "@/components/svg/gogle-icon";
import { googleLoginAction } from "@/lib/actions/login";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

const GoogleSignInButton: React.FC = () => {
    const { toast } = useToast();
    const { signInWithGoogle, user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithGoogle();
            if (!result.email) {
                toast({
                    title: "An error occurred",
                    description: "No email returned from Google authentication.",
                    variant: "destructive",
                    style: {
                        backgroundColor: "#f44336",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "12px",
                    },
                });
                return;
            }
            const data = await googleLoginAction(result.email);
            if (!data.success) {
                await signOut();
                console.log("modal should open");
                setShowDialog(true);
            }
        } catch (error) {
            console.log(error);
            setShowDialog(true);
            await signOut();
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
        } catch (error) {
            console.error("Failed to sign out:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!user ? (
                <Button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="w-full h-12 mt-2 rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <LoaderCircle size={12} className="rotation-loader animate-spin" />
                            Signing in...
                        </span>
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
                    disabled={loading}
                    className="w-full h-12 mt-2 rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <LoaderCircle size={12} className="rotation-loader animate-spin" />
                            Signing out...
                        </span>
                    ) : (
                        "Sign Out"
                    )}
                </Button>
            )}

            {/* Dialog for registration prompt */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-sm">
                    <DialogTitle className="text-sm">Account Not Found</DialogTitle>
                    <DialogDescription className="text-center">
                        We didn't find an account with that email address. <br /> Do you want to create an account?
                    </DialogDescription>
                    <DialogFooter>
                        <div className="flex w-full justify-between">
                            <div className="hidden md:flex items-center text-app-primary group relative">
                                <Link href="/signup" className="text-sm font-bold text-app-primary relative z-10">
                                    Create Account
                                </Link>
                                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-24 group-hover:bg-app-secondary"></div>
                            </div>
                            <span>
                                <Button variant="ghost" className="text-app-primary" onClick={() => setShowDialog(false)}>Cancel</Button>
                            </span>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GoogleSignInButton;
