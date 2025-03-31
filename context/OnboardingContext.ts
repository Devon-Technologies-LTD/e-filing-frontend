import { createContext, Dispatch, SetStateAction } from "react";

interface OnboardingContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>; // ✅ Fix type
}

export const OnboardingContext = createContext<OnboardingContextType>({
    loading: false,
    setLoading: () => {}, 
});
