import { FamilyDocumentMainTitles, FamilyDocumentTitles } from "@/constants";
import { addCaseTypeError, ICaseTypes } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type HookProps = {
  documents?: any;
};

const useFamilyCaseFormValidator = ({ documents }: HookProps) => {
  const dispatch = useDispatch();
  const validateDocument = (
    docTitle: FamilyDocumentMainTitles,
    errorKey: string
  ) => {
    const doc = documents?.find(
      (doc: any) => doc.title.toLowerCase() === docTitle.toLowerCase()
    );
    console.log("first doc", doc);
    if (!doc) {
      dispatch(addCaseTypeError({ [errorKey]: "Required" }));
      return false;
    } else {
      dispatch(addCaseTypeError({ [errorKey]: "" }));
      return true;
    }
  };

  const validate = async (_callback?: () => void) => {
    if (
      validateDocument(
        FamilyDocumentMainTitles.WitnessStatementOnOath,
        "witnessDoc"
      )
    ) {
      _callback?.();
    } else {
      toast.error("Fill all required fields");
    }
  };

  return { validate };
};

export { useFamilyCaseFormValidator };
