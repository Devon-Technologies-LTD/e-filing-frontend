"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/svg/icons";
import InputField from "@/components/ui/InputField";
import { TitlesSelect } from "@/components/title-select";
import { addLawyers } from "@/lib/actions/case-file";
import { toast } from "sonner";
import { checkDomainOfScale } from "recharts/types/util/ChartUtils";

import { useQueryClient } from "@tanstack/react-query";

// ✅ All fields required
const formSchema = z.object({
  honorific: z.string().min(1, "Honorific is required"),
  last_name: z.string().min(1, "Last name is required"),
  first_name: z.string().min(1, "First name is required"),
  email_address: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  phone_number: z
    .string()
    .regex(/^(\+234|0)[7-9][0-9]{9}$/, "Invalid phone number")
    .nonempty("Phone number is required"),
  whats_app: z
    .string()
    .regex(/^(\+234|0)[7-9][0-9]{9}$/, "Invalid phone number")
    .nonempty("Phone number is required"),
});

type FormData = z.infer<typeof formSchema>;

interface AddPersonDialogProps {
  type: string;
  caseId: string;
  isEdit?: boolean;
}

export function AddPersonDialog({ type, caseId, isEdit = false }: AddPersonDialogProps) {
  const [honorific, setHonorific] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // ✅ dialog open state

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      honorific: "",
    },
  });
  const queryClient = useQueryClient();

  // Manually update honorific field
  // useEffect(() => {
  //   setValue("honorific", honorific);
  //   trigger("honorific");
  // }, [honorific, setValue, trigger]);

  useEffect(() => {
    setValue("honorific", honorific, { shouldValidate: false }); // don't trigger validation yet
  }, [honorific, setValue]);


  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log(data);
      const response = await addLawyers(data, caseId, type);
      console.log(response);
      setLoading(false);
      if (response.success) {
        toast.success(`${type} added successfully.`);
        queryClient.invalidateQueries({ queryKey: ["get_single_case_by_id"] });
        reset();                    // ✅ clear form
        setHonorific("");          // ✅ clear honorific select
        setDialogOpen(false);
      } else {
        toast.error(`${response.data.message}: ${response.data.error}`);
      }

    } catch (error) {
      setLoading(false);

      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setDialogOpen(true)} className="text-sm font-semibold flex items-center gap-1">
          {isEdit ? "Discard" : (<><Icons.Edit /> Add {type}</>)}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="w-auto">
              <TitlesSelect
                value={honorific}
                onChange={(value) => {
                  setHonorific(value);
                  trigger("honorific"); // validate only when user actually changes
                }}
                error={errors.honorific?.message}
              />
              {errors.honorific && <p className="text-red-500 text-sm">{errors.honorific.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">Last Name</Label>
              <Input
                type="text"
                {...register("last_name")}
                className="mt-1 block w-full font-medium rounded-md text-sm p-2"
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">First Name</Label>
              <Input
                type="text"
                {...register("first_name")}
                className="mt-1 block w-full font-medium text-sm rounded-md p-2"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">Email Address</Label>
              <Input
                type="email"
                {...register("email_address")}
                className="mt-1 block w-full font-medium text-sm rounded-md p-2"
              />
              {errors.email_address && <p className="text-red-500 text-sm">{errors.email_address.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">Physical Address</Label>
              <Input
                type="text"
                {...register("address")}
                className="mt-1 block w-full font-medium text-sm rounded-md p-2"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">Phone Number</Label>
              <Input
                type="text"
                {...register("phone_number")}
                className="mt-1 block w-full font-medium text-sm rounded-md p-2"
              />
              {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
            </div>
            <div>
              <Label className="block text-sm font-semibold">Whatsapp Number</Label>
              <Input
                type="text"
                {...register("whats_app")}
                className="mt-1 block w-full font-medium text-sm rounded-md p-2"
              />
              {errors.whats_app && <p className="text-red-500 text-sm">{errors.whats_app.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}> {(loading ? "Loading..." : "Save Changes")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
