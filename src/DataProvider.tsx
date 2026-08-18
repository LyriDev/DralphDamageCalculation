import { createContext, useState } from "react";
import { TabData, TabDataMap, TabDataType } from "./utils/types";

type ContextType = {
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    tabs: TabData[];
    setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
    addTab(): void;
    toggleTabEnabled(index: number): void;
    setTabType(index: number, newType: keyof TabDataMap): void;
    setCharacterName(index: number, value: string): void;
    toggleCharacterName(index: number): void;
    setHorseName(index: number, value: string): void;
    setDexBoost(index: number, value: string): void;
};

export const DataContext = createContext<ContextType>({} as ContextType);

export function DataProvider({children}: {children: React.ReactNode}){
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [tabs, setTabs] = useState<TabData[]>([]);

    function addTab(){
        setTabs(tabs => {
            const newTabs: TabData[] = [
                ...tabs,
                {
                    enabled: true,
                    type: "Guard",
                    data: { 
                        character: { name: "" }
                    }
                }
            ];
            return newTabs;
        });
    }

    function toggleTabEnabled(index: number){
        setTabs(tabs => {
            const newTabs: TabData[] = tabs.map((tab, i) => {
                if(i === index){
                    return {
                        ...tab,
                        enabled: !tab.enabled
                    };
                }
                return tab;
            });
            return newTabs;
        });
    }

    function createDefaultData<T extends keyof TabDataMap>(type: T, currentData: TabDataType): TabDataMap[T] {
        const baseCharacterName = currentData.character.name ?? "";
        switch (type) {
            case "Guard":
                return {
                    character: { name: baseCharacterName }
                } as TabDataMap[T];;
            case "Ride":
                return {
                    character: { name: baseCharacterName },
                    horse: {
                        name: "",
                        dexBoost: "5"
                    }
                } as TabDataMap[T];;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    }

    function setTabType(index: number, newType: keyof TabDataMap){
        setTabs(tabs => {
            return tabs.map((tab, i) => {
                if (i !== index) return tab;
                if (tab.type === newType) return tab;

                return {
                    enabled: tab.enabled,
                    type: newType,
                    data: createDefaultData(newType, tab.data)
                } as TabData;
            });
        });
    }

    function setCharacterName(index: number, value: string){
        setTabs(tabs => {
            return tabs.map((tab, i) => {
                if (i !== index) return tab;
                return {
                    ...tab,
                    data: {
                        ...tab.data,
                        character: {
                            ...tab.data.character,
                            name: value
                        }
                    }
                } as TabData;
            });
        });
    }

    function toggleCharacterName(index: number){
        if(tabs[index].type !== "Guard") return;

        setTabs(tabs => {
            const newValue = (tabs[index].data.character.name === null) ? "" : null;

            return tabs.map((tab, i) => {
                if (i !== index) return tab;
                if(tab.type !== "Guard") return tab; // 型チェック用

                return {
                    ...tab,
                    data: {
                        ...tab.data,
                        character: {
                            ...tab.data.character,
                            name: newValue
                        }
                    }
                } as TabData;
            });
        });
    }

    function setHorseName(index: number, value: string){
        if(tabs[index].type !== "Ride") return;

        setTabs(tabs => {
            return tabs.map((tab, i) => {
                if (i !== index) return tab;
                if(tab.type !== "Ride") return tab; // 型チェック用

                return {
                    ...tab,
                    data: {
                        ...tab.data,
                        horse: {
                            ...tab.data.horse,
                            name: value
                        }
                    }
                } as TabData;
            });
        });
    }

    function setDexBoost(index: number, value: string){
        if(tabs[index].type !== "Ride") return;

        setTabs(tabs => {
            return tabs.map((tab, i) => {
                if (i !== index) return tab;
                if(tab.type !== "Ride") return tab; // 型チェック用

                return {
                    ...tab,
                    data: {
                        ...tab.data,
                        horse: {
                            ...tab.data.horse,
                            dexBoost: value
                        }
                    }
                } as TabData;
            });
        });
    }

    return (
        <DataContext.Provider
            value={{
                tabIndex, setTabIndex,
                tabs, setTabs,
                addTab,
                toggleTabEnabled,
                setTabType,
                setCharacterName,
                toggleCharacterName,
                setHorseName,
                setDexBoost
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
