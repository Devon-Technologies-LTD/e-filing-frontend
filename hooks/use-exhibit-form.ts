import { useCaseFilingForm } from "@/context/file-case";
import { Exhibit } from "@/types/exhibit";

const useExhibits = () => {
  const { exhibitFormData, updateExhibitFormData } = useCaseFilingForm();

  const addExhibit = (exhibit: Exhibit) => {
    updateExhibitFormData([...exhibitFormData, exhibit]);
  };
  const removeExhibit = (id: number) => {
    updateExhibitFormData(
      exhibitFormData.filter((exhibit) => exhibit.id !== id)
    );
  };

  const updateExhibitTitle = (id: number, title: string) => {
    updateExhibitFormData(
      exhibitFormData.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, title } : exhibit
      )
    );
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
    updateExhibitFormData(
      exhibitFormData.map((exhibit) =>
        exhibit.id === id ? { ...exhibit, file, fileName } : exhibit
      )
    );
  };
  return {
    exhibits: exhibitFormData,
    addExhibit,
    removeExhibit,
    updateExhibitTitle,
    handleFileChange,
    updateExhibitFile,
  };
};

export default useExhibits;
