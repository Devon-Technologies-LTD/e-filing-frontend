import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const STATUS_VARIANTS = {
  // Pending states
  "PENDING RE-ASSIGNMENT": "pending",
  "PENDING INVITATION": "pending",

  // Completed states
  "JUDGEMENT DELIVERED": "completed",
  "CLOSED": "completed",

  // Action states
  "ACTION REQUIRED": "action",

  // Request states
  "CASE REQUEST SUBMITTED": "submitted",
  "RE-ASSIGNMENT REQUEST SUBMITTED": "submitted",

  // Progress states
  "IN PROGRESS": "progress",

  // Assignment states
  "UNASSIGNED CASE": "unassigned",

  // Approval states
  "CASE REQUEST APPROVED": "approved",
  "RE-ASSIGNMENT REQUEST APPROVED": "approved",

  // Denial states
  "CASE REQUEST DENIED": "denied",
  "RE-ASSIGNMENT REQUEST DENIED": "denied",

  // Activity states
  "INACTIVE": "inactive",
  "ACTIVE": "active",

  // Special cases
  "WITHDRAWN": "withdrawn",
  "CRIMINAL CASE": "criminal",
  "FIRST HEARING SCHEDULED": "completed",
} as const;

const VARIANT_STYLES = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  completed: "bg-green-50 text-green-800 opacity-60",
  action: "bg-red-50 text-red-800 border-red-200",
  submitted: "bg-blue-50 text-blue-800 border-blue-200",
  progress: "bg-green-50 text-green-700 opacity-60",
  unassigned: "bg-gray-50 text-gray-800 border-gray-200",
  approved: "bg-emerald-50 text-emerald-800 border-emerald-200",
  denied: "bg-rose-50 text-rose-800 border-rose-200",
  inactive: "bg-slate-50 text-slate-800 border-slate-200",
  active: "bg-lime-50 text-lime-800 border-lime-200",
  withdrawn: "bg-orange-50 text-orange-800 border-orange-200",
  criminal: "bg-secondary-foreground text-primary opacity-60",
};

type StatusKey = keyof typeof STATUS_VARIANTS;
// type StatusVariant = (typeof STATUS_VARIANTS)[StatusKey];

interface StatusBadgeProps {
  status: StatusKey;
  className?: string;
  children?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}

export function StatusBadge({
  status,
  className,
  children,
  tooltip,
  tooltipProps,
}: StatusBadgeProps) {
  const variant = STATUS_VARIANTS[status];
  const variantClass = VARIANT_STYLES[variant];

  const badgeElement = (
    <Badge
      variant="outline"
      className={cn(
        "whitespace-nowrap font-bold uppercase py-1 border-none text-xs rounded-2xl",
        variantClass,
        className
      )}
    >
      {children || status.toLowerCase()}
    </Badge>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip {...tooltipProps}>
          <TooltipTrigger>{badgeElement}</TooltipTrigger>
          <TooltipContent side="bottom" className="text-zinc-700 font-medium text-xs">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeElement;
}
