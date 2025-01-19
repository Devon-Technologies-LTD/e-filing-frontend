'use client'

import { forwardRef, useImperativeHandle } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { LoaderCircle } from "lucide-react"
import { GogleIcon } from '@/components/svg/gogle-icon'



type TProps = {
    value: string;
    pendingValue?: string;
    className?: string;
    children?: React.ReactNode;
}

export type GogleButtonType = {
    isPending: boolean;
}

const GogleButton = forwardRef<GogleButtonType, TProps>((props, ref) => {
    const { pending } = useFormStatus()

    useImperativeHandle(ref, () => ({
        isPending: pending,
    }))

    return (
        <Button
            aria-disabled={pending}
            disabled={pending}
            className={cn('flex items-center justify-center gap-2', props.className)}
        >
            {props.children}
            <span className="flex space-x-4">
                <GogleIcon className='size-6' />
                {pending
                    ? (<p className="flex gap-2 items-center">
                        <LoaderCircle size={18} className="rotation-loader" />
                        {
                            props.pendingValue
                                ? `${props.pendingValue}...`
                                : `${props.value}...`
                        }
                    </p>)
                    : props.value
                }
            </span>
        </Button>
    )
})

GogleButton.displayName = 'GogleButton'


export { GogleButton }
