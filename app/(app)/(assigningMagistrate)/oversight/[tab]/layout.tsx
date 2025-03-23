"use client";

import { useState, useCallback, createContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { TCaseFilterType } from "@/types/case";
import { CaseTypes, COURT_TYPE, ALL_DISTRICT } from "@/types/files/case-type";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { ROLES } from "@/types/auth";
import MModal from "./_components/mModal";
import { useAppSelector } from "@/hooks/redux";
import { DivisionAdmin } from "@/components/division-admin";
import { LocationAdmin } from "@/components/location-admin";
import { MagistrateContext } from "@/context/MagistrateContext";



export default function LayoutPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const activeTab = params?.tab as string;
  const { data: user } = useAppSelector((state) => state.profile);
  const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);

  const [totalMagistrates, setTotalMagistrates] = useState<number>(0);

  const handleTabChange = useCallback((newTab: string) => {
    router.push(`/oversight/${newTab}`);
  }, [router]);

  const tabs: { id: TCaseFilterType; label: string }[] = [
    { id: "all", label: "All Magistrates" },
    { id: "performing", label: "Magistrate Performance" },
  ];
  const [selectedCourtDivision, setSelectedCourtDivision] = useState<string>(caseType.court_division);
  const [selectedCourtSubDivision, setSelectedCourtSubDivision] = useState<string>("");
  const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const handleCourtDivisionChange = (value: string) => {
    setSelectedCourtDivision(value);
    // handleChanges("court_division", value);
    // dispatch(addCaseTypeError({ court_division: "" }));
  };
  // const handleCourtTypeChange = useCallback((value: string) => {
  //   setSelectedCourt(value as CaseTypes);
  // }, []);

  // const handleCaseTypeChange = useCallback((value: string) => {
  //   setSelectedCase(value as CaseTypes);
  // }, []);

  const handleCourtSubDivisionChange = (value: string) => {
    setSelectedCourtSubDivision(value);
  };


  return (
    <MagistrateContext.Provider value={{ totalMagistrates, setTotalMagistrates }}>
      <div className="bg-white h-full overflow-hidden space-y-2 flex flex-col">
        <header className="shadow-md">
          <div className="container space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                {[ROLES.DIRECTOR_MAGISTRATE, ROLES.CHIEF_JUDGE].includes(user?.role as ROLES) && (
                  <LocationAdmin
                    placeholder="Select Division"
                    value={selectedCourtDivision}
                    onChange={handleCourtDivisionChange}
                    error={caseTypeErrors?.court_division}
                  />
                )}
                {[ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
                  <DivisionAdmin
                    id={user?.court_division_id ?? ""}
                    placeholder="Select District"
                    value={selectedCourtSubDivision}
                    className="bg-app-primary text-white"
                    onChange={handleCourtSubDivisionChange}
                    error={caseTypeErrors?.sub_division}
                  />
                )}
              </div>
              <div className="text-primary text-end">
                {activeTab === "all" ? (
                  <>
                    <p className="text-2xl font-bold">{totalMagistrates}</p>
                    <p className="text-sm font-bold">Total Magistrates across all divisions</p>
                  </>
                ) : (
                  <MModal />
                )}
                
              </div>
            </div>
            <ReusableTabs tabs={tabs} onTabChange={handleTabChange} activeTab={activeTab} />
          </div>
        </header>
        <div className="flex-1 container py-4 overflow-auto">{children}</div>
      </div>
    </MagistrateContext.Provider>
  );
}


// "use client";

// import { useState, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { TCaseFilterType } from "@/types/case";
// import { CaseTypes, COURT_TYPE, ALL_DISTRICT } from "@/types/files/case-type";
// import ReusableTabs from "@/components/ui/reusable-tabs";
// import { ROLES } from "@/types/auth";

// import MModal from "./_components/mModal";
// import { useAppSelector } from "@/hooks/redux";
// import { DivisionAdmin } from "@/components/division-admin";
// import { LocationAdmin } from "@/components/location-admin";


// export default function LayoutPage({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const params = useParams();
//   const activeTab = params?.tab as string;
//   const { data: user } = useAppSelector((state) => state.profile);

//   const [selectedCourt, setSelectedCourt] = useState<CaseTypes | "all">("all");
//   const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
//   const { caseType, caseTypeErrors } = useAppSelector((data) => data.caseFileForm);

//   const handleCourtTypeChange = useCallback((value: string) => {
//     setSelectedCourt(value as CaseTypes);
//   }, []);

//   const handleCaseTypeChange = useCallback((value: string) => {
//     setSelectedCase(value as CaseTypes);
//   }, []);

//   const handleTabChange = useCallback((newTab: string) => {
//     router.push(`/oversight/${newTab}`);
//   }, [router]);

//   const tabs: { id: TCaseFilterType; label: string }[] = [
//     { id: "all", label: "All Magistrates" },
//     { id: "performing", label: "Magistrate Performance" },
//   ];
//   const [selectedCourtDivision, setSelectedCourtDivision] = useState<string>(caseType.court_division);

//   const [selectedCourtSubDivision, setSelectedCourtSubDivision] = useState<string>("");

//   const courtFilterOptions = [{ value: "all", label: "ALL COURT TYPE" }, ...COURT_TYPE];
//   const districtFilterOptions = [{ value: "all", label: "ALL DISTRICTS" }, ...ALL_DISTRICT];
//   const handleCourtSubDivisionChange = (value: string) => {
//     setSelectedCourtSubDivision(value);
//   };
//   const handleCourtDivisionChange = (value: string) => {
//     setSelectedCourtDivision(value);
//     // handleChanges("court_division", value);
//     // dispatch(addCaseTypeError({ court_division: "" }));
//   };

//   return (
//     <div className="bg-white h-full overflow-hidden space-y-2 flex flex-col">
//       <header className="shadow-md">
//         <div className="container space-y-4">
//           <div className="flex items-center justify-between gap-3">
//             <div>
//               {[ROLES.DIRECTOR_MAGISTRATE, ROLES.CHIEF_JUDGE].includes(user?.role as ROLES) && (
//                 <LocationAdmin
//                   placeholder="Select Division"
//                   value={selectedCourtDivision}
//                   onChange={handleCourtDivisionChange}
//                   error={caseTypeErrors?.court_division}
//                 />
//               )}
//               {[ROLES.ASSIGNING_MAGISTRATE].includes(user?.role as ROLES) && (
//                 <DivisionAdmin
//                   id={user?.court_division_id ?? ""}
//                   placeholder="Select District"
//                   value={selectedCourtSubDivision}
//                   className="bg-app-primary text-white"
//                   onChange={handleCourtSubDivisionChange}
//                   error={caseTypeErrors?.sub_division}
//                 />
//               )}
//             </div>
//             <div className="text-primary text-end">
//               {activeTab === "all" ? (
//                 <>
//                   <p className="text-2xl font-bold">6</p> //total magisterata
//                   <p className="text-sm font-bold">Total Magistrates across all divisions</p>
//                 </>
//               ) : (
//                 <MModal />
//               )}
//             </div>
//           </div>
//           <ReusableTabs tabs={tabs} onTabChange={handleTabChange} activeTab={activeTab} />
//         </div>
//       </header>
//       <div className="flex-1 container py-4 overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// }
