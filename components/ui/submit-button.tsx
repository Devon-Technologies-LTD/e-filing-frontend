'use client'

import { forwardRef, useImperativeHandle } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { LoaderCircle } from "lucide-react"


type TProps = {
  value: string;
  pendingValue?: string;
  className?: string;
  children?: React.ReactNode;
}

export type SubmitButtonType = {
  isPending: boolean;
}

const SubmitButton = forwardRef<SubmitButtonType, TProps>((props, ref) => {
  const { pending } = useFormStatus()

  useImperativeHandle(ref, () => ({
    isPending: pending,
  }))

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className={cn('flex items-center justify-center gap-2', props.className)}
    >

      {props.children}

      <span>{pending
        ? (<p className="flex gap-2 items-center">
          <LoaderCircle size={18} className="rotation-loader" />
          {
            props.pendingValue
              ? `${props.pendingValue}...`
              : `${props.value}...`
          }
        </p>)
        : props.value}</span>
    </Button>
  )
})

SubmitButton.displayName = 'SubmitButton'


export { SubmitButton }
