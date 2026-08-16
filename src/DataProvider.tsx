import { createContext, useState } from "react";
import { TabData } from "./utils/types";

type ContextType = {
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    tabs: TabData[];
    setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
};

export const DataContext = createContext<ContextType>({} as ContextType);

export function DataProvider({children}: {children: React.ReactNode}){
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [tabs, setTabs] = useState<TabData[]>([]);

    return (
        <DataContext.Provider
            value={{
                tabIndex, setTabIndex,
                tabs, setTabs
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
