import { HelpCircle } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  CriminalCaseSubType,
  CivilCaseSubType,
  CaseTypeData,
} from "../../constants";
import { ToolTipCard } from "@/components/ui/tool-tip-card";

type TooltipData = {
  title: string;
  description: string;
};

const tooltips: { [key: string]: TooltipData } = {
  [CriminalCaseSubType.DIRECT_COMPLAIN]: {
    title: "DIRECT CRIMINAL REPORT",
    description:
      "A Direct Criminal Report (also called a Direct Complaint Report) is when a person goes directly to the court to file a complaint about a crime instead of reporting it to the police first. The court then reviews the complaint and decides whether to proceed with the case. <br/><br/> Example: If someone is a victim of fraud and chooses to file the case directly in court instead of going through the police, they are making a Direct Criminal Report.",
  },
  [CivilCaseSubType.RECOVERY_OF_PREMISE]: {
    title: "RECOVERY OF PREMISE",
    description:
      "This is when a landlord takes legal action to regain possession of their property from a tenant. It is usually done when a tenant refuses to leave after their rent expires, fails to pay rent, or violates the rental agreement.",
  },
  [CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS]: {
    title: "PLAINT OF DEFAULT SUMMONS",
    description:
      "This is a legal claim filed when someone fails to fulfill a financial obligation, such as paying a debt or honoring a contract. The claimant is asking the court to issue a Default Summons, which notifies the defendant of the claim and may lead to a judgment if they do not respond. <br /><br/> Example:<br/> A landlord filing for unpaid rent or a business suing for an unpaid invoice.",
  },
  [CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS]: {
    title: "PLAINT OF SPECIFIC SUMMONS",
    description:
      "This is a legal request asking the court to enforce a specific right or obligation. It is used when a person is seeking the court’s intervention to compel someone to fulfill a duty, such as handing over property, completing a contract, or returning goods.<br/><br/>Example:<br/>“A person suing to get back a car they legally own but is being withheld by another party.”",
  },
  [CaseTypeData.CIVIL_CASE]: {
    title: "CIVIL CASES TYPES",
    description:
      "1. Recovery of Premises:<br /> This is when a landlord takes legal action to reclaim their property from a tenant, usually due to unpaid rent or the tenant refusing to leave after their lease has ended.<br/><br/> 2. Specific Summons:<br/> This is used when someone is asking the court to enforce a specific right, such as demanding the return of property, fulfillment of a contract, or performance of an obligation.<br/><br/> 3. Default Summons:<br/> This is issued when a person fails to respond to a legal claim (like debt repayment). It allows the court to make a decision in favor of the claimant without the defendant’s input.",
  },
};

interface CaseTypeTooltipProps {
  caseType: CaseTypeData;
  subCaseType?: string;
}

const CaseTypeTooltip = ({ caseType, subCaseType }: CaseTypeTooltipProps) => {
  const tooltipData =
    (subCaseType ? tooltips[subCaseType] : undefined) ||
    (caseType === CaseTypeData.CIVIL_CASE && !subCaseType
      ? tooltips[CaseTypeData.CIVIL_CASE]
      : null);

  if (!tooltipData) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            className="h-4 w-4 text-neutral-500 hover:text-neutral-700 cursor-help"
            aria-label="tooltipText"
          />
        </TooltipTrigger>
        <TooltipContent className="mb-12 justify-start p-0">
          <ToolTipCard
            className="justify-start text-start"
            title={tooltipData.title}
            description={tooltipData.description}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CaseTypeTooltip;
