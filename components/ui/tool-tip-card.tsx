import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { HelpCircle } from "lucide-react";

interface HelpCardProps {
  title: string;
  description: string;
  className?: string;
}

export function ToolTipCard({ title, description, className }: HelpCardProps) {
  return (
    <div
      className={cn(`bg-white rounded-lg p-4 max-w-xs space-y-3`, className)}
    >
      <h2 className="text-primary text-sm font-semibold ">{title}</h2>
      <p
        className="text-black text-xs font-bold"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}

export const TextwithToolTip = ({
  tooltipText,
  tooltipContent,
}: {
  tooltipText?: string;
  tooltipContent: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            className="h-4 w-4 text-neutral-500 hover:text-neutral-700 cursor-help"
            aria-label={tooltipText}
          />
        </TooltipTrigger>
        <TooltipContent className="mb-12 p-0">{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
