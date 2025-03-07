import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PopoverCalendarProps = {
    initialDate?: Date;
    onDateSelect?: (date: Date | undefined) => void;
    triggerElement?: ReactNode;
    className?: string;
};

export function PopoverCalendar({ initialDate, onDateSelect, triggerElement, className }: PopoverCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(initialDate);

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        onDateSelect?.(selectedDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild className={cn("h-11 border-2", className)}>
                {triggerElement || <Button variant="outline">DATE FILE: MOST RECENT</Button>}
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    className=""
                />
            </PopoverContent>
        </Popover>
    );
}
