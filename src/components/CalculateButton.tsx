import React from 'react';
import { Button } from '@mui/material';
import { decrementParamsWithResult } from "./../utils/rollDiceFromResult"

type Props = {
    enableMagicArmour: boolean;
    enableBigShield: boolean;
    multiplier: string;
    radioValue: string;
    sliderValue: number;
}

// ダメージ処理(HPと盾の耐久力を減少させるロール)を行う関数
function decrementHealth(useShield: boolean, shieldType: string, reductionRate: number, enableMagicArmour: boolean, enableBigShield: boolean, multiplier: string): void{
    let role: string = "";
    let dialog: string = "";
    let decrementParams: string[] = new Array;

    // 追加倍率を計算する
    let additionalRate: number = 100;
    if(!isNaN(Number(multiplier))){
        additionalRate = Number(multiplier);
    }

    // ダメージ入力をユーザーに求める
    if(useShield){
        dialog = `相手が出したダメージを入力してください。\n被ダメージ計算後、HPと${shieldType}の耐久力を減少させます。`;
    }else{
        dialog = `相手が出したダメージを入力してください。\n被ダメージ計算後、HPを減少させます。`;
    }
    const damage: string = window.prompt(dialog) || "";

    // ダメージ入力が不正な値の場合、処理をやめる
    if((isNaN(Number(damage)) || (damage === "") || (damage === null))) return;

    // ユーザーが入力したダメージを元に計算を行うロールの文字列を作成する
    if(useShield){
        const shieldArmor: string = enableBigShield ? "({盾装甲}*13/10R)" : "{盾装甲}";
        role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)-({装甲}+${shieldArmor}${enableMagicArmour ? "+{魔法装甲}" : ""})) 【盾ガード時被ダメージ】`;
        decrementParams.push("HP");
        decrementParams.push(shieldType);
    }else{
        role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)-({装甲}${enableMagicArmour ? "+{魔法装甲}" : ""})) 【被ダメージ】`;
        decrementParams.push("HP");
    }

    // ダメージを計算するロールを行い、その結果を元にパラメータを減少させるロールを行う
    decrementParamsWithResult(role, decrementParams);
}

// 物理防御力段階等を元に、実際の軽減倍率を計算する関数
function getReductionRate(reductionGrade: number): number{
    let result: number = 1;
    const reductionTable: {
        [grade: string]: number;
    } = {
        "3": 0.25,
        "2": 0.5,
        "1": 0.75,
        "0": 1,
        "-1": 1.5,
        "-2": 1.75,
        "-3": 2
    };
    const reductionRate: number | undefined = reductionTable[reductionGrade];
    if(reductionRate !== undefined) result = reductionRate;
    return result;
}

export default function CalculateButton(props: Props){
    const {
        enableMagicArmour,
        enableBigShield,
        multiplier,
        radioValue,
        sliderValue
    } = props;

    return (
        <div>
            <Button
                className="draggable-disable"
                variant="text"
                onClick={()=>{
                    const reductionRate: number = getReductionRate(sliderValue);
                    decrementHealth(true, radioValue, reductionRate, enableMagicArmour, enableBigShield, multiplier);
                }}>
                    計算(盾あり)
            </Button>
            <Button
                className="draggable-disable"
                variant="text"
                onClick={()=>{
                    const reductionRate: number = getReductionRate(sliderValue);
                    decrementHealth(false, "", reductionRate, enableMagicArmour, enableBigShield, multiplier);
                }}>
                    計算(盾なし)
            </Button>
        </div>
    );
};