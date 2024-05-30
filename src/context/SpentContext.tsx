import React, { createContext, useState, useContext, ReactNode } from "react";

interface SpentContextType {
  todaySpents: any[];
  setTodaySpents: Function;
  monthSpents: any[];
  setMonthSpents: Function;
}

const SpentContext = createContext<SpentContextType | undefined>(undefined);

export const SpentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todaySpents, setTodaySpents] = useState([]);
  const [monthSpents, setMonthSpents] = useState([]);

  return (
    <SpentContext.Provider
      value={{ todaySpents, setTodaySpents, monthSpents, setMonthSpents }}
    >
      {children}
    </SpentContext.Provider>
  );
};

export const useSpents = () => {
  const context = useContext(SpentContext);
  if (!context) {
    throw new Error("useSpents deve ser usado dentro de um SpentProvider");
  }
  return context;
};
