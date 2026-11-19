import React, { createContext, useContext, useMemo, useState } from "react";
import type { Mission } from "../types/Mission";

type AppContextValue = {
  xp: number;
  completedMissions: string[];
  addCompletedMission: (mission: Mission) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [xp, setXp] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const addCompletedMission = (mission: Mission) => {
    if (completedMissions.includes(mission.id)) return;
    setCompletedMissions((current) => [...current, mission.id]);
    setXp((current) => current + mission.xp);
  };

  const value = useMemo(
    () => ({ xp, completedMissions, addCompletedMission }),
    [xp, completedMissions],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de AppProvider.");
  return context;
}
