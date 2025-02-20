import { FamilyCaseSubType } from "@/constants";
import { addCaseTypeError } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type HookProps = {
  documents?: any;
};

const useFamilyCaseFormValidator = ({ documents }: HookProps) => {
  const dispatch = useDispatch();
  const checkDocuments = (callback: () => void) => {
    const requiredDocuments = Object.values(FamilyCaseSubType);
    const isAtLeastOnePresent = documents.some((doc: any) =>
      requiredDocuments.includes(doc.title as FamilyCaseSubType)
    );

    if (isAtLeastOnePresent) {
      callback?.();
    } else {
      dispatch(
        addCaseTypeError({
          familyDoc: "Please upload at least one document",
        })
      );
      toast.error("Please upload at least one document");
    }
  };

  const validate = async (_callback?: () => void) => {
    if (_callback) {
      checkDocuments(_callback);
    } else {
      console.log("No callback provided.");
    }
  };

  return { validate };
};

export { useFamilyCaseFormValidator };
