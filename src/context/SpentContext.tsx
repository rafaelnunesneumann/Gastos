import React, { createContext, useState, useContext, ReactNode } from "react";

interface SpentContextType {
  spents: any[];
  setSpents: Function;
}

const SpentContext = createContext<SpentContextType | undefined>(undefined);

export const SpentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spents, setSpents] = useState([]);

  return (
    <SpentContext.Provider value={{ spents, setSpents }}>
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
