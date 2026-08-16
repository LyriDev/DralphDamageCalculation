export type Shield = {
    shieldName: string;
    shieldArmorName: string;
};

export type SpecialArmor = {
    armorName: string;
    enable: boolean;
};

type HitData = {
    characterName: string | null;
}

type RideData = {
    characterName: string | null;
    horseName: string | null;
}

export type TabData = 
| { enabled: boolean; type: "Hit"; data: HitData }
| { enabled: boolean; type: "Ride"; data: RideData };
