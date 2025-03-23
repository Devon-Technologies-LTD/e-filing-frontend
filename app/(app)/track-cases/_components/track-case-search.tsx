/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icons } from "@/components/svg/icons";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function TrackCaseSearch() {
  const [openDialog, setOpenDialog] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setOpenDialog(false);
      }
    };

    // Add event listener when the dropdown is open
    if (openDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDialog]);
  return (
    <div className="relative md:w-[100px] lg:w-[500px]">
      <Command className="">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral" />
          <div className="relative md:w-[100px] lg:w-[500px]">
            <Input
              type="search"
              variant="ghost"
              autoComplete="off"
              data-form-type="other"
              placeholder="e.g search case name"
              className="pl-9 h-12 md:w-[100px] bg-zinc-100 lg:w-[500px]"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => {
                setOpenDialog(!openDialog);
              }}
            >
              <Icons.recent className=" h-4 w-4 text-neutral" />
            </button>
          </div>
        </div>{" "}
        {openDialog && (
          <CommandList
            ref={dropdownRef}
            className="z-50 absolute top-16 shadow-lg bg-white w-full"
          >
            <CommandGroup>
              <CommandItem className="font-bold text-sm">
                Recent Searches
              </CommandItem>
            </CommandGroup>{" "}
            <CommandSeparator className="bg-neutral-100" />
            <CommandGroup>
              <CommandItem className="font-semibold text-xs text-zinc-900 cursor-pointer">CV/WZ2/001e/Year </CommandItem>
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
