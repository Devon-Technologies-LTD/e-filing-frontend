import { cn } from "@/lib/utils"
import Image from 'next/image';


const LogoIcon = ({ className }: React.SVGAttributes<HTMLOrSVGElement>) => {
    return (
        <Image
            src="/logo.png"
            alt="Front ID"
            className="object-contain"
            width={150}
            height={150}
        />
    )
}

export { LogoIcon }
