import { createContext } from "react";

interface MonitoringContextType {
  totalCase: number;
  caseName: string;
  setTotalCase: (count: number) => void;
  setCaseName: (count: string) => void;
}

export const MonitoringContext = createContext<MonitoringContextType>({
  totalCase: 0,
  caseName: "cases",
  setTotalCase: () => { },
  setCaseName: () => { },
});
