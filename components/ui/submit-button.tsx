'use client';

import { forwardRef, useImperativeHandle } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { LoaderCircle } from "lucide-react";

type TProps = {
  value: string;
  pendingValue?: string;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean; // Added to allow external control of the loading state
};

export type SubmitButtonType = {
  isPending: boolean;
};

const SubmitButton = forwardRef<SubmitButtonType, TProps>((props, ref) => {
  const { pending: formPending } = useFormStatus();
  const isPending = props.loading ?? formPending;
  useImperativeHandle(ref, () => ({
    isPending,
  }));

  return (
    <Button
      aria-disabled={isPending}
      disabled={isPending}
      type="submit"
      className={cn('flex items-center justify-center gap-2', props.className)}
    >
      {props.children}

      <span>
        {isPending ? (
          <p className="flex gap-2 items-center">
            <LoaderCircle size={18} className="rotation-loader animate-spin" />
            {props.pendingValue ? props.pendingValue : `${props.value}...`}
          </p>
        ) : (
          props.value
        )}
      </span>
    </Button>
  );
});

SubmitButton.displayName = 'SubmitButton';

export { SubmitButton };
