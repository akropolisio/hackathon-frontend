import { createContext, useContext } from "react";
import { Store } from "~/store";

export const StoreContext = createContext<Store>(null as any);

export function useStore(): Store {
  const context: Store | null = useContext(StoreContext);

  if (context === null) {
    throw new Error("Store context is not defined");
  }

  return context;
}
