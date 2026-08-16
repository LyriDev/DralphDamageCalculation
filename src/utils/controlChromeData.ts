import { getInitialArmorData, PowerArmor } from "./getPowerArmorData";

// Chromeローカルストレージのデータの型
export type StorageData = {
    characterName: string; // 搭乗者名
    powerArmors: PowerArmor[]; // パワーアーマーのデータ
    enableAdditionalArmors: boolean; // 装甲の適用状態
    additionalArmors: AdditionalArmor[]; // 適用する装甲リスト
};

type AdditionalArmor = {
    armorName: string;
    enable: boolean;
}

// 装甲リスト
const armorsNameList = ["装甲", "物理装甲", "魔法装甲", "息装甲", "火耐性", "氷耐性", "風耐性", "土耐性", "雷耐性", "水耐性", "光耐性", "闇耐性"];

// 値を取得
async function getStorage<K extends keyof StorageData>(
    key: K
): Promise<StorageData[K]>{
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key]);
            }
        });
    });
};

// 値をセット
export async function setStorage<K extends keyof StorageData>(
    key: K,
    value: StorageData[K]
): Promise<void>{
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: value }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
};

// PC名とアーマーデータを一括で取得
export async function getAllArmorsWithPcName(): Promise<StorageData> {
    const characterName = (await getStorage("characterName")) || "搭乗者";
    const powerArmors: PowerArmor[] = (await getStorage("powerArmors")) || [getInitialArmorData("アーマー1")];
    const initializedPowerArmors = initializePowerArmors(powerArmors);
    const enableAdditionalArmors = (await getStorage("enableAdditionalArmors")) || true;
    const additionalArmors: AdditionalArmor[] = (await getStorage("additionalArmors")) || armorsNameList.map(armorName => ({armorName, enable: false}));

    return {
        characterName,
        powerArmors: initializedPowerArmors,
        enableAdditionalArmors,
        additionalArmors
    };
}

function initializePowerArmors(powerArmors: PowerArmor[]): PowerArmor[] {
    return powerArmors.map(armor => { {
        const initializedModules = armor.modules.map(module => ({
            ...module,
            isEnabled: false,
        }));
        return {
            ...armor,
            modules: initializedModules,
        };
    }});
}
