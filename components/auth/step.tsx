import React from 'react';

interface StepComponentProps {
    currentStep?: number;
    totalSteps?: number;
    heading: string;
    subheading?: string;
}

const StepComponent: React.FC<StepComponentProps> = ({
    currentStep = 1,
    totalSteps = 3,
    heading,
    subheading
}) => {
    return (
        <div className='space-y-8'>
            <span className="text-xs text-muted text-gray-400">STEP {currentStep} of {totalSteps}</span>
            <p className="text-app-primary mt-2 text-2xl w-72">{heading}</p>
            <div className="flex items-center mt-10">
                {[...Array(totalSteps)].map((_, index) => {
                    const step = index + 1;
                    return (
                        <div
                            key={step}
                            className={`h-[1px] w-[100px] ${step <= currentStep ? 'bg-app-secondary' : 'bg-gray-300'}`}
                        ></div>
                    );
                })}
            </div>
            {subheading && <p className="text-app-tertiary  text-sm font-semibold ">{subheading}</p>}
        </div>
    );
};

export default StepComponent;
