import { createContext, useContext } from "react";
import { StoreState } from "./types/types";

export const StoreContext = createContext<StoreState | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
