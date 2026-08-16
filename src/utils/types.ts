export type Shield = {
    shieldName: string;
    shieldArmorName: string;
};

export type SpecialArmor = {
    armorName: string;
    enable: boolean;
};

type GuardData = {
    characterName: string | null;
}

type RideData = {
    characterName: string | null;
    horseName: string | null;
}

export type TabDataType = GuardData | RideData;

export type TabDataMap = {
    Guard: GuardData;
    Ride: RideData;
};

export type TabData = {
    [K in keyof TabDataMap]: {
        enabled: boolean;
        type: K;
        data: TabDataMap[K];
    }
}[keyof TabDataMap];
