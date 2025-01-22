"use client";

import { useState } from "react";
import { Plus, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Exhibit } from "@/types/exhibit";
import { Icons } from "@/components/svg/icons";

export default function ExhibitForm() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([{ id: 1, title: "" }]);

  const handleAddExhibit = () => {
    const newId = Math.max(...exhibits.map((e) => e.id)) + 1;
    setExhibits([...exhibits, { id: newId, title: "" }]);
  };

  const handleRemoveExhibit = (id: number) => {
    setExhibits(exhibits.filter((exhibit) => exhibit.id !== id));
  };

  const handleTitleChange = (id: number, value: string) => {
    setExhibits(
      exhibits.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, title: value } : exhibit
      )
    );
  };

  const handleFileChange = (id: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setExhibits(
      exhibits.map((exhibit) =>
        exhibit.id === id
          ? {
              ...exhibit,
              file: files[0],
              fileName: files[0].name,
            }
          : exhibit
      )
    );
  };

  const handleDownloadSample = (id: number) => {
    // In a real application, this would trigger a download of the sample document
    console.log("Downloading sample document for exhibit:", id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Submitting exhibits:", exhibits);
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto space-y-8">
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-neutral-500">
          Submission of Exhibits are optional but{" "}
          <span className="text-primary font-semibold">RECOMMENDED</span>
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          Accepted Files - PNG, PDF, DOC, JPEG, JPG Formats
        </p>
      </div>

      <div className="space-y-6">
        {exhibits.map((exhibit, index) => (
          <div key={exhibit.id} className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{index + 1}.</span>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <Label variant={"underline"} htmlFor={`title-${exhibit.id}`}>
                  NAME/TITLE OF EXHIBITS
                </Label>
              </div>

              {exhibits.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveExhibit(exhibit.id)}
                >
                  <Icons.bin className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4">
              <Input
                id={`title-${exhibit.id}`}
                value={exhibit.title}
                variant="underlined"
                onChange={(e) => handleTitleChange(exhibit.id, e.target.value)}
                placeholder="e.g evidence documents"
              />

              <div className="space-y-2">
                <Label variant={"underline"} htmlFor={`file-${exhibit.id}`}>
                  UPLOAD EXHIBIT FILE
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={`file-${exhibit.id}`}
                      type="file"
                      accept=".png,.pdf,.doc,.jpeg,.jpg"
                      onChange={(e) =>
                        handleFileChange(exhibit.id, e.target.files)
                      }
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div className="border rounded-md px-3 py-2 text-sm">
                      {exhibit.fileName || "Choose File"}
                    </div>
                  </div>
                  {exhibit.fileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFileChange(exhibit.id, null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="link"
                className="flex justify-start w-min text-app-secondary hover:text-app-secondary/90 p-0 text-sm font-bold"
                onClick={() => handleDownloadSample(exhibit.id)}
              >
                DOWNLOAD SAMPLE DOCUMENT
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size={"lg"}
        className="w-auto hover:bg-red-50 px-2 border-2"
        onClick={handleAddExhibit}
      >
        <Plus className="h-4 w-4 " />
        ADD NEW EXHIBIT
      </Button>
    </form>
  );
}
