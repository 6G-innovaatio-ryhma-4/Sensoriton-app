import { createContext, useContext, useState } from "react";

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [scenario, setScenario] = useState("default");

  return (
    <SimulationContext.Provider value={{ scenario, setScenario }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);