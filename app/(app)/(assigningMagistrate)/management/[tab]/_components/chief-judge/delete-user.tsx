import React, { useState } from "react";
import axios from "axios";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  userId: string | undefined; // Expecting user ID to delete
  email: string | undefined; // Expecting user ID to delete
  trigger: React.ReactNode;
}

function DeleteUser({ userId, email, trigger }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.toLowerCase() !== "delete");
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    try {
      const data = {
        'email': email,
        'userId': userId
      }
      const response = await axios.post(`/api/delete-user`, data);
      toast.success("User deleted successfully!");
      console.log("Delete response:", response.data);
      setIsOpen(false); // ✅ Close only on success
    } catch (error: any) {
      console.error("Error deleting user:", error);

      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).map(
          (message) => `${message}`
        );
        setErrorMessages(errors);
        toast.error("Failed to delete user. Please check the errors below.");
      } else {
        toast.error("Failed to delete user. Please try again.");
      }

      // ❌ DO NOT close the modal if an error occurs
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} trigger={trigger}>
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="h-12 w-12 bg-secondary-foreground flex items-center justify-center">
            <Icons.infocircle />
          </div>
          <div className="text-center text-primary space-y-2">
            <p className="font-bold text-xl">Delete User?</p>
            <p className="text-black font-semibold text-sm text-center max-w-sm mx-auto">
              Are you sure you want to delete this user? This action is
              irreversible and will permanently remove their access to the
              platform. To confirm, type <strong>DELETE</strong> in the field below.
            </p>
          </div>
        </div>

        <Input
          type="text"
          variant="ghost"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder='Type "DELETE" to confirm'
          className="pl-2 h-12 text-sm max-w-sm mx-auto opacity-60"
        />

        {errorMessages.length > 0 && (
          <div className="text-red-500 text-sm text-center">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <AlertDialogFooter className="flex items-center sm:justify-center w-full">
          <AlertDialogAction
            className="font-medium text-sm bg-red-600 h-12 disabled:bg-neutral-200 disabled:text-zinc-500"
            onClick={handleDelete}
            disabled={isButtonDisabled || loading}
          >
            {loading ? "Deleting..." : "DELETE USER"}
          </AlertDialogAction>

          <AlertDialogCancel className="font-extrabold text-red-500 text-xs uppercase">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </div>
    </ConfirmationModal>
  );
}

export default DeleteUser;
