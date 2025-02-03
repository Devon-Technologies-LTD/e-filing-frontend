"use client";
import React, { useState } from "react";
import { Search, Download, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/svg/icons";

interface Document {
  id: string;
  name: string;
  type: string;
  fileDate: string;
}

interface DocumentGroup {
  date: string;
  documents: Document[];
}

export function CaseDocumentList() {
  const [searchQuery, setSearchQuery] = useState("");

  const documentGroups: DocumentGroup[] = [
    {
      date: "12/02/2024",
      documents: [
        { id: "1", name: "COVER PAGE", type: "pdf", fileDate: "12/02/2024" },
        {
          id: "2",
          name: "Plaint/Recovery Of Premise - Civil Form 5",
          type: "pdf",
          fileDate: "12/02/2024",
        },
        {
          id: "3",
          name: "Witness Statement On Oath",
          type: "pdf",
          fileDate: "12/02/2024",
        },
      ],
    },
    {
      date: "25/02/2024",
      documents: [
        {
          id: "4",
          name: "Motion On Notice",
          type: "pdf",
          fileDate: "25/02/2024",
        },
        {
          id: "5",
          name: "Motion Exparte",
          type: "pdf",
          fileDate: "25/02/2024",
        },
      ],
    },
  ];
  const filteredGroups = documentGroups
    .map((group) => ({
      ...group,
      documents: group.documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.documents.length > 0);

  const handleDownload = (documentId: string) => {
    console.log(`Downloading document ${documentId}`);
  };

  const handleDownloadAll = (date: string) => {
    console.log(`Downloading all documents for ${date}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            variant="ghost"
            autoComplete="off"
            data-form-type="other"
            placeholder="e.g search document name"
            className="pl-9 h-12 md:w-[100px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className=" ">
            <Button
              variant="outline"
              className="gap-2 h-12 border-2 text-xs font-semibold text-zinc-900 focus:bg-secondary-foreground"
            >
              ACTIONS
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuItem variant="outline" className="uppercase text-sm">
              Refile other process{" "}
            </DropdownMenuItem>
            <DropdownMenuItem variant="outline" className="uppercase text-sm">
              Download all documents{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div className="w-1/6">
          <FilterDropdown
            triggerVariant="outline"
            itemVariant="outline"
            placeholder="SELECT ACTIONS"
            options={filter}
            value={selectedFilter}
            onChange={handleFilterChange}
          />
        </div> */}
      </div>

      <div className="space-y-6">
        {filteredGroups.map((group) => (
          <div
            key={group.date}
            className="rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="bg-secondary-foreground px-6 py-2 flex justify-between items-center">
              <div className="text-base font-medium">
                Filed on: <span className="font-bold">{group.date}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold text-sm"
                onClick={() => handleDownloadAll(group.date)}
              >
                Download All
              </Button>
            </div>
            <div className="divide-y divide-gray-200">
              {group.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Icons.pdf className="h-6 w-6" />
                    <span className="text-sm font-bold">{doc.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleDownload(doc.id)}
                  >
                    <Download className="h-4 w-4 text-black" />
                    <span className="sr-only">Download {doc.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
