import { createContext, useContext } from "react";

export const MainStoreContext = createContext({});

export const useMainStoreContext = () => useContext(MainStoreContext);
