'use client'

import { BackIcon } from '@/components/svg/back-icon'
import { useRouter } from 'next/navigation'

type Props = {
  showText?: boolean;
}

const BackButton = ({ showText = true }: Props) => {
  const router = useRouter()

  return (
    <div onClick={() => router.back()} className='flex border-2 w-24 text-center items-center justify-center border-app-primary text-black'>
      <BackIcon className='size-4' />
      {showText && (<p className='font-medium text-xs p-3'>Back</p>)}
    </div>
  )
}

export { BackButton }
