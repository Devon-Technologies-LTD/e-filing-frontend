import Image from "next/image";
import React from "react";
import { LogoIcon } from "./svg/logoIcon";

export default function SuspenseLoader() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <LogoIcon className="animate-spin" />
    </div>
  );
}
