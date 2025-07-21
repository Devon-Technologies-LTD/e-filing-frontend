import { Icons } from '@/components/svg/icons'
import React from 'react'

export default function EmptyTrackCases() {
  return (
    <div>
        <div className="bg-white h-full space-y-6 relative w-full flex flex-col items-center justify-center rounded-lg">
        <Icons.empty />
        <p className="absolute bottom-4 font-semibold max-w-56 text-sm text-center">
          You have no recent tracked cases
        </p>
      </div>
    </div>
  )
}
