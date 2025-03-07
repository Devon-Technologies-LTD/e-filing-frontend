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
import {
  addDocument,
  clearForm,
  ICaseTypes,
  IDocumentFileType,
  updateMultipleCaseTypeFields,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { getCaseTypeFields } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface IProps {
  data: ICaseTypes & { id: string; documents: IDocumentFileType[] };
}

export function CaseDocumentList({ data }: IProps) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  //grouped the documents by date
  const groupedDocuments = (data?.documents || [])?.reduce(
    (acc: { [key: string]: any }, doc) => {
      const date = doc.created_at
        ? new Date(doc.created_at).toLocaleDateString()
        : "Unknown date";
      acc[date] = acc[date] || { date, documents: [] };
      acc[date].documents.push(doc);
      return acc;
    },
    {}
  );

  //filter by name search
  const filteredGroups = Object.values(groupedDocuments)
    ?.map((group) => ({
      ...group,
      documents: group.documents.filter((doc: IDocumentFileType) =>
        doc.sub_title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.documents.length > 0);

  // const documentGroups = Object.values(groupedDocuments);
  const handleRefileProcesses = () => {
    const caseTypeFields = getCaseTypeFields(data);
    dispatch(clearForm());
    dispatch(updateStep(3));
    dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
    dispatch(addDocument([]));
    navigate.push(`${data?.id}/refile-documents`);
  };

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
            <DropdownMenuItem
              onClick={handleRefileProcesses}
              variant="outline"
              className="uppercase text-xs"
            >
              Refile other process{" "}
            </DropdownMenuItem>
            <DropdownMenuItem variant="outline" className="uppercase text-xs">
              Download all documents{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-6">
        {filteredGroups.length > 0 ? (
          filteredGroups?.map((group) => (
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
                {group.documents.map((doc: IDocumentFileType) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Icons.pdf className="h-6 w-6" />
                      <span className="text-sm font-bold">{doc.sub_title}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleDownload(doc.id)}
                    >
                      <Download className="h-4 w-4 text-black" />
                      <span className="sr-only">Download {doc.sub_title}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="bg-white h-full space-y-6 relative w-full flex flex-col items-center justify-center rounded-lg">
              <Icons.empty />
              <p className="absolute bottom-4 font-semibold max-w-56 text-sm text-center">
                No documents found {searchQuery?`matching "${searchQuery}"`:""}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
