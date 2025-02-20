"use client";
import React from "react";
import { Icons } from "@/components/svg/icons";


export default function UnderReview({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦");
  };


  return (
    <>
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-4.5rem)] w-full shrink-0 md:sticky md:block">

        {/* <aside className="top-14  hidden h-[calc(100vh-4.5rem)] w-full shrink-0 md:sticky md:block"> */}
        <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
          <div className="max-h-screen bg-white border-r pr-12">
            <div className="mx-auto overflow-auto scrollbar-hide h-[calc(100vh-220px)] space-y-8">
              <div>
                <div className="sticky top-0 bg-white z-10 space-y-4">
                  <div className="text-xs font-semibold text-gray-600 mb-2">
                    CASE REVIEWS / {decodeURIComponent(id)}
                  </div>
                  <div className="text-3xl font-medium leading-8 text-primary">
                    Review case files before it is assigned
                  </div>
                  <div className="h-0.5 w-full bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-[#C4704B] transition-all duration-300 ease-in-out"
                      style={{ width: `${100}%` }}
                    />
                  </div>
                  <p className="border-b-2 border-app-primary w-24">Case Type</p>
                  <p className="text-muted text-sm text-gray-400">Uploaded Documents</p>
                  <p className="text-muted text-sm text-gray-400">Submitted Exhibits</p>

                  <div className="flex justify-between text-md mt-2 font-bold">
                    <span>Total Cost Breakdown</span>
                    <span>{formatCurrency(3500)}</span>
                  </div>


                  <p className="text-muted text-sm">Criminal Case</p>
                  <div className="flex justify-between text-md font-bold">
                    <span>Uploaded Document</span>
                    <span className="text-sm">Amount</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Request for Remand Order</span>
                    <span> {formatCurrency(0.0)}</span>
                  </div>

                  <div className="flex justify-between text-md font-bold">
                    <span>SUBMITTED EXHIBITS</span>
                    <span className="text-sm">Amount</span>
                  </div>

                  <div className="flex justify-between">
                    <span className=" text-sm">Request for Remand Order</span>
                    <span> {formatCurrency(0.0)}</span>
                  </div>


                  <div className="flex justify-between ">
                    <span className="text-sm text-app-primary">Seal Generation</span>
                    <span> {formatCurrency(0.0)}</span>
                  </div>

                  <div className="flex justify-between ">
                    <span>Total</span>
                    <span> {formatCurrency(0.0)}</span>
                  </div>




                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="py-6 pb-32 overflow-auto space-y-6">
        <div className="space-y-8">
          <div className="flex font-bold justify-between border-b-2 border-app-primary">
            <p>Case Type</p>
            <p>Amount</p>
          </div>
          <div className="w-[354px] space-y-6">
            <div className="flex justify-between border-b-2 border-gray-400 bg-gray-200 p-3">
              <p className="text-sm">CRIMINAL CASE</p>
              <Icons.lock />
            </div>
            <div className="flex justify-between border-b-2 border-gray-400 bg-gray-200 p-3">
              <p className="text-sm">REQUEST FOR REMAND ORDER (EXPARTE)</p>
              <Icons.lock />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex font-bold justify-between border-b-2 border-app-primary">
            <p>Uploaded Document</p>
            <p>Amount</p>
          </div>
          <div className=" space-y-6">
            <div className="">
              <p className="text-xs text-app-primary">FIRST INFORMATION REPORT</p>
              <div className="flex justify-between">
                <div className="flex w-[354px]  justify-between border-b-2 border-gray-300 bg-gray-200 p-3">
                  <span className="flex gap-2">
                    <Icons.file />
                    <p className="text-sm">FORM V1 - FIR</p>
                  </span>
                  <Icons.lock />
                </div>
                <p className="font-bold text-sm">500 </p>
              </div>
              <p className="text-xs text-app-primary">CLICK TO VIEW FILE</p>
            </div>
            <div className="">
              <p className="text-xs text-app-primary">CHARGE SHEET DOCUMENT</p>
              <div className="flex justify-between">
                <div className="flex w-[354px]  justify-between border-b-2 border-gray-300 bg-gray-200 p-3">
                  <span className="flex gap-2">
                    <Icons.file />
                    <p className="text-sm">FORM V1 - FIR</p>
                  </span>
                  <Icons.lock />
                </div>
                <p className="font-bold text-sm">500 </p>
              </div>
              <p className="text-xs text-app-primary">CLICK TO VIEW FILE</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex font-bold justify-between border-b-2 border-app-primary">
            <p>Submitted Exhibits</p>
            <p>Amount</p>
          </div>
          <div className=" space-y-6">
            <div className="">
              <p className="text-xs text-app-primary">FIRST INFORMATION REPORT</p>
              <div className="flex justify-between">
                <div className="flex w-[354px]  justify-between border-b-2 border-gray-300 bg-gray-200 p-3">
                  <span className="flex gap-2">
                    <Icons.file />
                    <p className="text-sm">FORM V1 - FIR</p>
                  </span>
                  <Icons.lock />
                </div>
                <p className="font-bold text-sm">500 </p>
              </div>
              <p className="text-xs text-app-primary">CLICK TO VIEW FILE</p>
            </div>
            <div className="">
              <p className="text-xs text-app-primary">CHARGE SHEET DOCUMENT</p>
              <div className="flex justify-between">
                <div className="flex w-[354px]  justify-between border-b-2 border-gray-300 bg-gray-200 p-3">
                  <span className="flex gap-2">
                    <Icons.file />
                    <p className="text-sm">FORM V1 - FIR</p>
                  </span>
                  <Icons.lock />
                </div>
                <p className="font-bold text-sm">500 </p>
              </div>
              <p className="text-xs text-app-primary">CLICK TO VIEW FILE</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};