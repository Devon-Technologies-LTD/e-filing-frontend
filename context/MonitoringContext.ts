import { createContext } from "react";

interface MonitoringContextType {
  totalCase: number;
  setTotalCase: (count: number) => void;
}

export const MonitoringContext = createContext<MonitoringContextType>({
  totalCase: 0,
  setTotalCase: () => {},
});
