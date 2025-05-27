"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icons } from "./svg/icons";
import { deleteSession } from "@/lib/server/auth";

export default function LogoutModal() {
  const router = useRouter();

  const handleLogout = async () => {
    deleteSession();
    router.push("/login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className={cn(  
            "rounded-md text-neutral-400 hover:bg-gray-100 block py-1 px-4 text-sm font-semibold transition-color"
          )}
        >
          <p className="inline-block relative">Logout</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] p-6 space-y-3">
        <DialogTitle className="text-xl text-black font-semibold text-center">
          Logout
        </DialogTitle>
        <DialogDescription className="text-sm text-black text-center">
          Are you sure you want to log out? Any unsaved changes will be lost..
        </DialogDescription>
        <div className="flex justify-center">
          <Icons.exclamation />
        </div>
        <DialogFooter className="flex md:justify-center gap-4 sm:gap-0">
          <Button
            variant="default"
            size={"lg"}
            className="flex-1 text-xs sm:flex-none"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="flex-1 text-xs text-primary sm:flex-none"
            >
              CANCEL
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
