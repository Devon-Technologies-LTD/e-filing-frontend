import React from 'react';
import { Input } from './ui/input';
interface DatedThisProps {
    title?: string; // Optional dynamic text
    subtitle?: string; // Optional dynamic text
    dayPlaceholder?: string;
    monthPlaceholder?: string;
    yearPlaceholder?: string;
}

const DatedThis: React.FC<DatedThisProps> = ({
    title = "This plaint was taken out by claimant/counsel as the case may be",
    subtitle = "DATED THIS",
    dayPlaceholder = "eg 10th",
    monthPlaceholder = "eg January",
    yearPlaceholder = "eg 10th",
}) => {
    return (
        <div className='space-y-2'>
            <p className="text-base font-bold">{title}</p>
            <span className="text-sm font-medium">{subtitle}</span>
            <div className="flex items-end justify-start text-center">
                <Input
                    name="day"
                    type="text"
                    placeholder={dayPlaceholder}
                    required={false}
                    className={`w-24 border-0 border-b-[1px] placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 shadow-none focus:outline-none focus:border-b-2 bg-transparent px-2 py-2`}
                />
                <span className="text-center items-center font-semibold justify-center mx-4">
                    DAY OF
                </span>
                <Input
                    name="month"
                    type="text"
                    placeholder={monthPlaceholder}
                    required={false}
                    className={`w-28 border-0 border-b-[1px] placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 shadow-none focus:outline-none focus:border-b-2 bg-transparent px-2 py-2`}
                />
                <span className="text-center items-center justify-center font-semibold mx-4">
                    20
                </span>
                <Input
                    name="year"
                    type="text"
                    placeholder={yearPlaceholder}
                    required={false}
                    className={`w-24 border-0 border-b-[1px] placeholder:text-xs placeholder:font-semibold placeholder:text-zinc-500 shadow-none focus:outline-none focus:border-b-2 bg-transparent px-2 py-2`}
                />
            </div>
        </div>
    );
};

export default DatedThis;
