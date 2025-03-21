import { createContext } from "react";

interface MagistrateContextType {
    totalMagistrates: number;
    setTotalMagistrates: (count: number) => void;
}

export const MagistrateContext = createContext<MagistrateContextType>({
    totalMagistrates: 0,
    setTotalMagistrates: () => {},
});
