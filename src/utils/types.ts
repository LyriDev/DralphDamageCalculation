export type Shield = {
    shieldName: string;
    shieldArmorName: string;
};

export type SpecialArmor = {
    armorName: string;
    enable: boolean;
};

type GuardData = {
    character: {
        name: string | null;
    }
}

type RideData = {
    character: {
        name: string;
    },
    horse: {
        name: string,
        dexBoost: string
    }
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
