'use client';
import Image from 'next/image';
import LegalCard1 from '@/public/assets/images/Legal-card.png';
import LegalCard2 from '@/public/assets/images/Legal-card2.png';
import { FrontIcon } from '@/components/svg/front-icon';
import Link from 'next/link';
import { useCaseFilingForm } from '@/context/file-case';
import { useEffect } from 'react';

const Signup = () => {
    const { currentStep, setCurrentStep } = useCaseFilingForm();
    useEffect(() => {
        if (currentStep !== 1) {
            setCurrentStep(2 as 3);
        }
    }, [1, currentStep, setCurrentStep]);
    return (
        <>
            <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6 p-4">
                <Link href="/lawyer" className="w-full md:max-w-md ">
                    <div className="group relative w-full border-[1px] border-t-0 border-gray-300 hover:border-app-secondary space-y-3 overflow-hidden transition-colors duration-300">
                        <div className="relative">
                            <div className="relative w-full h-48 xs:h-full">
                                <Image
                                    src={LegalCard1}
                                    alt="legal-image"
                                    fill
                                    className="w-full h-full object-cover object-center group-hover:grayscale-0 grayscale transition-transform duration-300 ease-in-out"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 space-y-6 md:space-y-10">
                            <p className="text-sm font-semibold">
                                I&apos;m a Legal Practitioner
                            </p>
                            <p className="text-xs text-muted">
                                Seamlessly file and manage cases with features tailored for legal
                                practitioners. Verification using your Supreme Court Number is
                                required.
                            </p>
                            <div className="flex justify-between mt-6 md:mt-10 items-center text-xs">
                                PROCEED AS A LAWYER
                                <FrontIcon className="size-4" />
                                <div className="absolute m-6 mb-4 bottom-0 left-0 w-full h-[2px] bg-gradient-to-b from-app-primary to-app-secondary scale-x-0 transform origin-left transition-transform duration-300 group-hover:scale-x-90"></div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Card 2 */}
                <Link href="/individual" className="w-full md:max-w-md">
                    <div className="group relative w-full border-[1px] border-t-0 border-gray-300 hover:border-app-secondary space-y-3 overflow-hidden transition-colors duration-300">
                        <div className="relative">
                            <div className="relative w-full h-48 xs:h-full">
                                <Image
                                    src={LegalCard2}
                                    alt="legal-image"
                                    fill
                                    className="w-full h-full object-cover object-center group-hover:grayscale-0 grayscale transition-transform duration-300 ease-in-out"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 space-y-6 md:space-y-10">
                            <p className="text-sm font-semibold">I&apos;m Filing for Myself</p>
                            <p className="text-xs text-muted">
                                Easily submit your case details without legal credentials. Our
                                platform is here to simplify the filing process for you.
                            </p>
                            <div className="flex justify-between mt-6 md:mt-10 items-center text-xs">
                                PROCEED AS A NON-LAWYER
                                <FrontIcon className="size-4" />
                                <div className="absolute m-6 mb-4 bottom-0 left-0 w-full h-[2px] bg-gradient-to-b from-app-primary to-app-secondary scale-x-0 transform origin-left transition-transform duration-300 group-hover:scale-x-90"></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export { Signup };
