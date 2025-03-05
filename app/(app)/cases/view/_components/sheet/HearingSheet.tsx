

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SchuduleSheet from "./SchuduleSheet";


interface HearingSheetProps {
  trigger: React.ReactNode;
  id: String,
}




export default function HearingSheet({ trigger, id }: HearingSheetProps) {
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Hearing scheduled successfully!");
      } else {
        toast.error("Failed to schedule hearing. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
        <div className="space-y-8 mx-auto">
          <div className="space-y-10 w-full">
            <div>
              <p className="font-bold text-xl">Hearing History</p>
              <div className="font-semibold text-sm">
                Review the complete record of all scheduled hearings for this case, including dates, times, and any updates or changes made.
              </div>
            </div>
            <div className="grid border-b-2 pb-3">
              <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
              <span className="text-app-primary font-bold text-sm">CV/WZ2/001e/2024</span>
              <span className="text-app-primary text-sm">John Doe vs Jane Doe</span>
            </div>

            <div className="bg-zinc-100 p-4 justify-between text-sm flex">
              <p className="font-bold">DATE</p>
              <p>TIME</p>
            </div>

            <div className="flex justify-between text-sm font-semibold pb-4 border-b-2 border-zinc-100">
              <p>12/05/2020</p>
              <p>09:00AM</p>
            </div>

            <form action={handleSubmit}>
              {/* <SchuduleSheet data={data} trigger={<Button type="submit">SCHEDULE A HEARING</Button>} /> */}
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// import React, { ReactNode, useState } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import SchuduleSheet from "./SchuduleSheet";



// export default function HearingSheet({ trigger }: any) {

//   return (
//     <Sheet>
//       <SheetTrigger onClick={(e) => e.stopPropagation()}>{trigger}</SheetTrigger>
//       <SheetContent side="right" className="bg-white md:w-[505px] min-w-[505px] h-full">
//         <div className="space-y-8 mx-auto">
//           <div className="space-y-10 w-full">
//             <div>
//               <p className="font-bold text-xl">Hearing History</p>
//               <div className="font-semibold text-sm">
//                 Review the complete record of all scheduled hearings for this case, including dates, times, and any updates or changes made.
//               </div>
//             </div>
//             <div className="grid border-b-2 pb-3">
//               <p className="text-stone-600 text-sm font-bold mb-2">Case Suit Number</p>
//               <span className="text-app-primary font-bold text-sm">CV/WZ2/001e/2024 </span>
//               <span className="text-app-primary text-sm">John Doe vs Jane Doe</span>
//             </div>

//             <div className="bg-zinc-100 p-4 justify-between text-sm  flex">
//               <p className="font-bold">DATE</p>
//               <p>TIME</p>
//             </div>

//             <div className="flex justify-between text-sm font-semibold pb-4 border-b-2 border-zinc-100">
//               <p>12/05/2020</p>
//               <p>09:00AM</p>
//             </div>
//             <SchuduleSheet data={data} trigger={<Button>SCHEDULE A HEARING</Button>} />

//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }


