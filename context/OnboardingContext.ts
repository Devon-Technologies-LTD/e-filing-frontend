import { createContext, Dispatch, SetStateAction } from "react";

interface OnboardingContextType {
    loading: boolean;
    active: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>; // ✅ Fix type
    setActive: Dispatch<SetStateAction<boolean>>; // ✅ Fix type
}

export const OnboardingContext = createContext<OnboardingContextType>({
    loading: false,
    active: false,
    setLoading: () => {}, 
    setActive: () => {}, 
});
