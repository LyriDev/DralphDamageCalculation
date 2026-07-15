import React from 'react';
import { Button } from '@mui/material';
import { decrementParamsWithResult } from "./../utils/rollDiceFromResult"
import { SpecialArmor } from "./../utils/types";

type Props = {
    enableSpecialArmour: boolean;
    specialArmors: SpecialArmor[];
    enableBigShield: boolean;
    multiplier: string;
    shieldName: string;
    shieldArmourName: string;
    sliderValue: number;
    enableWound: boolean;
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

export default function ExCalculateButton(props: Props){
    const {
        enableSpecialArmour,
        specialArmors,
        enableBigShield,
        multiplier,
        shieldName,
        shieldArmourName,
        sliderValue,
        enableWound
    } = props;

    // 有効な特殊装甲を取得する関数
    function getSpecialArmour(withoutArmor: boolean = false): string[]{
        let result: string[] = [];
        if(enableSpecialArmour){
            specialArmors.forEach(data => {
                if(!data.enable) return;
                if(withoutArmor && data.armorName.includes("装甲")) return; // 装甲無視の際は耐性のみ参照
                result.push(`{${data.armorName}}`);
            })
        }
        return result;
    }

    // ダメージ処理(HPと盾の耐久力を減少させるロール)を行う関数
    function decrementHealth(type: "withoutArmor" | "onlyShield", reductionRate: number): void{
        let role: string = "";
        let dialog: string = "";
        let decrementParams: string[] = new Array;

        // 追加倍率を計算する
        let additionalRate: number = 100;
        if(!isNaN(Number(multiplier))){
            additionalRate = Number(multiplier);
        }

        // ダメージ入力をユーザーに求める
        dialog = `相手が出したダメージを入力してください。\n被ダメージ計算後、HPと${shieldName}の耐久力を減少させます。`;
        const damage: string = window.prompt(dialog) || "";

        // ダメージ入力が不正な値の場合、処理をやめる
        if((isNaN(Number(damage)) || (damage === "") || (damage === null))) return;

        // ユーザーが入力したダメージを元に計算を行うロールの文字列を作成する
        if(type === "withoutArmor"){
            // 装甲無視+盾装甲無視(盾の秘伝書)
            const shieldArmor: string = enableBigShield ? `({${shieldArmourName}}*13/10R)` : `{${shieldArmourName}}`;
            const armorsStr: string = [shieldArmor, ...getSpecialArmour(true)].join("+");
            role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)-(${armorsStr})) 【盾ガード時被ダメージ(装甲無視)】盾の秘伝書「心」`;
            decrementParams.push("HP");
            decrementParams.push(shieldName);
        }else{
            // 装甲無視だけど盾は使用
            const specialArmor: string[] = getSpecialArmour(true);
            const specialArmorStr: string = (specialArmor.length > 0) ? `-(${specialArmor.join("+")})` : "";
            role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)${specialArmorStr}) 【被ダメージ(装甲無視)】`;
            decrementParams.push("HP");
            decrementParams.push(shieldName);
        }

        // ダメージを計算するロールを行い、その結果を元にパラメータを減少させるロールを行う
        decrementParamsWithResult(role, decrementParams, enableWound);
    }

    return (
        <div>
            <Button
                className="draggable-disable"
                variant="text"
                onClick={()=>{
                    const reductionRate: number = getReductionRate(sliderValue);
                    decrementHealth("withoutArmor", reductionRate);
                }}>
                    計算(盾装甲のみ)
            </Button>
            <Button
                className="draggable-disable"
                variant="text"
                onClick={()=>{
                    const reductionRate: number = getReductionRate(sliderValue);
                    decrementHealth("onlyShield", reductionRate);
                }}>
                    計算(装甲無視&盾使用)
            </Button>
        </div>
    );
};