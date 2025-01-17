import React from "react";
import { CoffeeLogo } from "../svg/coffee-logo";
import Banner from "../svg/banner1";
import Banner2 from "../svg/banner2";

export default function MobileLoader() {
  return (
    <div className="min-h-[100dvh] w-full relative flex items-center justify-center overflow-hidden z-[9999999999999]">
      <div className="absolute top-0 left-0 right-0">
        <Banner className="w-full" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <CoffeeLogo className="fill-lulu-coffee h-[92px] w-[87px] animate-pulse" />
        <h4 className="font-normal text-lg">Getting Menu</h4>
        <p className="text-sm text-center text-[#1E0F00] font-light">
          Hold on while we get it...
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Banner2 className="w-full" />
      </div>
    </div>
  );
}
