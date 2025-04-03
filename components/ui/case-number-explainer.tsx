import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../svg/icons";

export default function CaseNumberExplainer() {
  return (
    <Card className="max-w-4xl mx-auto rounded-none bg-white border-0">
      <CardHeader className="rounded-none ">
        <div className="flex items-center gap-3">
          <Icons.LightBulb/>
          <CardTitle className="text-xl text-black font-medium">
            What is Case Suit Number?{" "}
            <span className="text-primary font-semibold">CV/WZ2/001e/2024</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4 text-black">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <div className="font-bold text-base">CR →</div>
          <div className="text-base font-medium">
            Case Type (e.g., CV = Civil Case, CR = Criminal Case, FC = Family
            Case, etc.)
          </div>

          <div className="font-bold text-base">WZ2 →</div>
          <div className="text-base font-medium">
            Court Division/Location Code (e.g., WZ2 could represent a specific
            jurisdiction <span className="font-semibold">Wuse Zone 2</span>)
          </div>

          <div className="font-bold text-base">001 →</div>
          <div className="text-base font-medium">
            Sequential Case Number (Indicates the case's order of filing in that
            jurisdiction for the year)
          </div>

          <div className="font-bold text-base">e →</div>
          <div className="text-base font-medium">
            Electronic Filing Indicator (This could signify that the case was
            filed through an e-filing system)
          </div>

          <div className="font-bold text-base">2024 →</div>
          <div className="text-base font-medium">
            Filing Year (The year the case was officially filed)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
