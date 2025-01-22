import { useCaseFilingForm } from "@/context/file-case";
import { Exhibit } from "@/types/exhibit";

const useExhibits = () => {
  const { formData, updateFormData } = useCaseFilingForm();

  const addExhibit = (exhibit: Exhibit) => {
    updateFormData({ exhibits: [...formData.exhibits, exhibit] });
  };

  const removeExhibit = (id: number) => {
    updateFormData({
      exhibits: formData.exhibits.filter((exhibit) => exhibit.id !== id),
    });
  };

  const updateExhibitTitle = (id: number, title: string) => {
    updateFormData({
      exhibits: formData.exhibits.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, title } : exhibit
      ),
    });
  };

  const handleFileChange = (id: number, files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const newFile = files[0];
    const newFileName = newFile.name;

    updateExhibitFile(id, newFile, newFileName);
  };

  const updateExhibitFile = (id: number, file?: File, fileName?: string) => {
    updateFormData({
      exhibits: formData.exhibits.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, file, fileName } : exhibit
      ),
    });
  };


  return {
    exhibits: formData.exhibits,
    addExhibit,
    removeExhibit,
    updateExhibitTitle,
    handleFileChange,
    updateExhibitFile,
  };
};

export default useExhibits;
