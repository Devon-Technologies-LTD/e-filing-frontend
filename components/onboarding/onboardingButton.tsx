"use client";

import { forwardRef, useImperativeHandle } from "react";
import { useFormState } from "@/hooks/useFormState"; // Import custom hook
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type TProps = {
  value: string;
  pendingValue?: string;
  submitform?: string;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
};

export type OnboardingButtonType = {
  isPending: boolean;
};

const OnboardingButton = forwardRef<OnboardingButtonType, TProps>((props, ref) => {
  const { isSubmitting, setIsSubmitting } = useFormState();
  const isPending = props.loading ?? isSubmitting;

  useImperativeHandle(ref, () => ({
    isPending,
  }));

  const handleClick = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000); // Simulating form submission
  };

  return (
    <Button
      aria-disabled={isPending}
      disabled={isPending}
      form={props.submitform}
      type="submit"
      className={cn("flex items-center justify-center gap-2", props.className)}
      onClick={handleClick} // Handle button click
    >
      {props.children}

      <span>
        {isPending ? (
          <span className="flex gap-2 items-center">
            <LoaderCircle size={18} className="rotation-loader animate-spin" />
            {props.pendingValue ?? `${props.value}...`}
          </span>
        ) : (
          props.value
        )}
      </span>
    </Button>
  );
});

OnboardingButton.displayName = "onboardingButton";

export { OnboardingButton };
