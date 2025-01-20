'use client'
import Image from "next/image";
import LegalCard1 from "@/public/assets/images/Legal-card.png";
import LegalCard2 from "@/public/assets/images/Legal-card2.png";
import { FrontIcon } from '@/components/svg/front-icon'
import StepComponent from "./step";
import Link from "next/link";

const Signup = () => {
    return (
        <>
            <div className="flex w-full h-full space-x-2">
                <div className="w-[354px] border-r-2 mr-10">
                    <StepComponent
                        currentStep={1}
                        totalSteps={3}
                        heading="How will you be filing your cases?"
                    />
                </div>
                {/* <div className="w-[2px] h-52 bg-gray-200"></div> */}
                <Link href="/lawyer">
                    <div className="group relative w-[406px] border-[1px] border-t-0 border-gray-300 hover:border-app-secondary space-y-3 overflow-hidden transition-colors duration-300">
                        <div className="relative">
                            <div className="relative w-full h-full">
                                <Image
                                    src={LegalCard1}
                                    alt="legal-image"
                                    height={1000}
                                    width={500}
                                    className="w-full h-full object-cover object-center group-hover:grayscale-0 grayscale transition-transform duration-300 ease-in-out "
                                />
                                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                        <div className="p-6 space-y-10 ">
                            <p className="text-sm font-semibold">I&apos;m a Legal Practitioner</p>
                            <p className="text-xs text-muted">
                                Seamlessly file and manage cases with features tailored for legal practitioners. Verification using your Supreme Court Number is required
                            </p>
                            <div className="flex justify-between mt-10 items-center text-xs">
                                PROCEED AS A LAWYER
                                <FrontIcon className="size-4" />
                                <div className="absolute m-6 mb-4 bottom-0 left-0 w-full h-[2px] bg-gradient-to-b from-app-primary to-app-secondary scale-x-0 transform origin-left transition-transform duration-300 group-hover:scale-x-90"></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/individual">
                    <div className="group relative w-[406px] border-[1px]  border-t-0 border-gray-300 hover:border-app-secondary space-y-3 overflow-hidden transition-colors duration-300">
                        <div className="relative">
                            <div className="relative w-full h-full">
                                <Image
                                    src={LegalCard2}
                                    alt="legal-image"
                                    height={1000}
                                    width={500}
                                    className="w-full h-full object-cover object-center group-hover:grayscale-0 grayscale transition-transform duration-300 ease-in-out "
                                />
                                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                        <div className="p-6 space-y-10 ">
                            <p className="text-sm font-semibold">I&apos;m Filing for Myself</p>
                            <p className="text-xs text-muted">Easily submit your case details without legal credentials. Our platform is here to simplify the filing process for you</p>


                            <div className="flex justify-between mt-10 items-center text-xs">
                                PROCEED AS AN INDIVIDUAL
                                <FrontIcon className="size-4" />
                                <div className="absolute m-6 mb-4 bottom-0 left-0 w-full h-[2px] bg-gradient-to-b from-app-primary to-app-secondary scale-x-0 transform origin-left transition-transform duration-300 group-hover:scale-x-90"></div>
                            </div>
                        </div>
                    </div>
                </Link>

              

            </div >

        </>

    )
}

export { Signup }
