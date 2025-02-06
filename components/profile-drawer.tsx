import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface ProfileDrawerProps {
    open: boolean;
    onClose: () => void;
    user: any; // Replace 'any' with a proper user type if available
}

export default function ProfileDrawer({ open, onClose, user }: ProfileDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="bg-white bottom-0 w-[800px] h-4/5 sm:w-[640px]">
                <SheetHeader>
                    <SheetTitle>User Profile</SheetTitle>
                    <SheetDescription>
                        <div className="bg-white space-y-4">
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>District:</strong> {user?.districts}</p>
                            <p><strong>Status:</strong> {user?.status}</p>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}


// {selectedMetric && (
//     <RightSidebarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <>

//             <div className="space-y-8">
//                 <div>
//                     <h2 className="text-xl font-bold mb-4">{selectedMetric.title}</h2>
//                     <p className="text-base">{selectedMetric.description}</p>
//                 </div>

//                 <div className="flex justify-between">
//                     <div>
//                         <p className="text-2xl text-app-primary font-bold">{selectedMetric.total}</p>
//                         <span className="flex items-center space-x-2 text-app-primary">
//                             <Icons.arrowUp className="h-4 w-4" />
//                             <div>
//                                 <span className="font-bold">
//                                     {selectedMetric.lastYear} {" "}
//                                 </span>
//                                 in the last year
//                             </div>
//                         </span>
//                     </div>
//                     <div className="flex gap-3">
//                         <AllCasesFilter />
//                     </div>
//                 </div>

//                 <div className={`flex justify-between text-md font-bold p-3 ${selectedMetric.color}`}>
//                     <p>DISTRICT</p>
//                     <p>NUMBER OF CASES</p>
//                 </div>


//                 <div className="overflow-y-auto max-h-[400px]">
//                     {selectedMetric.districts.map((district, index) => (
//                         <div
//                             key={index}
//                             className="flex justify-between border-b-2 p-4"
//                         >
//                             <p>{district.name}</p>
//                             <p>{district.cases}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     </RightSidebarModal>
// )}
