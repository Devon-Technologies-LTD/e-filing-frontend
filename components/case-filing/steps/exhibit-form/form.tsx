import React from "react";
import { Plus, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/svg/icons";
import useExhibits from "@/hooks/use-exhibit-form";

export default function ExhibitFormFields() {
  const {
    exhibits,
    addExhibit,
    removeExhibit,
    updateExhibitTitle,
    handleFileChange,
    updateExhibitFile,
  } = useExhibits();

  const handleAddExhibit = () => {
    const newId = Math.max(...exhibits.map((e) => e.id), 0) + 1; 
    addExhibit({ id: newId, title: "" });
  };

  const handleDownloadSample = (id: number) => {
    //trigger a download of the sample document
    console.log("Downloading sample document for exhibit:", id);
  };

  return (
    <div className="space-y-2">
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
                  onClick={() => removeExhibit(exhibit.id)}
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
                onChange={(e) => updateExhibitTitle(exhibit.id, e.target.value)}
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
                    <div className="flex px-2 font-semibold items-center w-full rounded-md shadow-sm transition-colors border-0 border-b-2 border-app-secondary bg-zinc-100 h-10 focus:outline-none focus-visible:ring-b focus-visible:ring-input text-neutral-950 placeholder:text-zinc-400">
                      {exhibit.fileName || "Choose File"}
                    </div>
                  </div>
                  {exhibit.fileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateExhibitFile(exhibit.id, undefined, "")
                      }
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
    </div>
  );
}
