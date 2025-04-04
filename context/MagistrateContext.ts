import { createContext } from "react";

interface MagistrateContextType {
    totalMagistrates: number;
    setTotalMagistrates: (count: number) => void;
    courtDivision: string;  // ✅ Fixed missing colon
    courtSubDivision: string; // ✅ Added type definition
    setSelectedCourtSubDivisionContext: (subDivision: string) => void; // ✅ Fixed function syntax
    setSelectedCourtDivisionContext: (division: string) => void; // ✅ Fixed function syntax
}

export const MagistrateContext = createContext<MagistrateContextType>({
    totalMagistrates: 0,
    setTotalMagistrates: () => {},
    courtDivision: "", // ✅ Added default empty string value
    courtSubDivision: "", // ✅ Added default empty string value
    setSelectedCourtSubDivisionContext: () => {}, // ✅ Provided default function implementations
    setSelectedCourtDivisionContext: () => {}, // ✅ Provided default function implementations
});
