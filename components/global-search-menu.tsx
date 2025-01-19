"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchMenu() {
 
  return (
    <>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
        <Input
          type="search"
          variant="ghost"
          placeholder="e.g case name, number, magistrate"
          className="pl-9 text-sm md:w-[100px] lg:w-[350px] opacity-60"
        />
      </div>
    </>
  );
}
