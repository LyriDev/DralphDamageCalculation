import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import AddPanelButton from "./AddPanelButton"
import { sendCcfoliaMessage, sendMessage } from '../utils/sendCcfoliaMessage';
import StatusLevelChange from "./StatusLevelChange";
import CalculateButton from "./CalculateButton";
import SelectShield from "./SelectShield";
import BigShield from "./BigShield";
import SpecialMagnification from "./SpecialMagnification";
import SelectSpecialArmor from "./SelectSpecialArmor"
import Wound from "./Wound"
import { SpecialArmor, Shield } from "./../utils/types";
import TwoHandsShield from "./TwoHandsShield"

const shields = [
    {
        shieldName: "盾",
        shieldArmorName: "盾装甲"
    },
    {
        shieldName: "盾2",
        shieldArmorName: "盾装甲"
    },
    {
        shieldName: "両手盾",
        shieldArmorName: "両手盾装甲"
    },
    {
        shieldName: "両手盾2",
        shieldArmorName: "両手盾装甲"
    },
    {
        shieldName: "神聖剣",
        shieldArmorName: "神聖剣装甲"
    },
    {
        shieldName: "神聖剣2",
        shieldArmorName: "神聖剣装甲"
    },
    {
        shieldName: "神聖剣3",
        shieldArmorName: "神聖剣装甲"
    }
]

const specialArmorList = [
    {
        armorName: "物理装甲",
        enable: false
    },
    {
        armorName: "魔法装甲",
        enable: true
    },
    {
        armorName: "息装甲",
        enable: false
    },
    {
        armorName: "火耐性",
        enable: false
    },
    {
        armorName: "氷耐性",
        enable: false
    },
    {
        armorName: "風耐性",
        enable: false
    },
    {
        armorName: "土耐性",
        enable: false
    },
    {
        armorName: "雷耐性",
        enable: false
    },
    {
        armorName: "水耐性",
        enable: false
    },
    {
        armorName: "光耐性",
        enable: false
    },
    {
        armorName: "闇耐性",
        enable: false
    }
]

export const twoHandsShieldCountMax: number = 10;
const twoHandsShieldCountMinus: number = 5;

function showTextWithConditions(text: string, conditions: boolean){
    if(conditions) return text;
    return "";
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff" // プライマリーカラーを白色に設定
        },
        secondary: {
            main: "rgba(0,0,0,0)" // セカンダリーカラーを無色に設定
        },
    },
    typography: {
        button: {
            textTransform: "none",
            fontWeight: 'bold'
        },
    },
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'white', // 非アクティブ時のカラーを白に設定
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    color: 'white', // カスタムテキストカラーを指定
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'white', // 非アクティブ時のカラーを白に設定
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'white', // 下線の色を白色に設定
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // 下線の色を白色に設定
                    },
                    '& .MuiInput-input': {
                      color: 'white' // フォームの文字色を白色に設定
                    }
                }
            }
        }
    },
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAdditions, setVisibleAdditions] = useState<boolean>(false);

    const [enableSpecialArmour, setEnableSpecialArmour] = useState<boolean>(false);
    const [specialArmors, setSpecialArmors] = useState<SpecialArmor[]>(specialArmorList);

    const [enableBigShield, setEnableBigShield] = useState<boolean>(false);
    const [multiplier, setMultiplier] = useState<string>("100");

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const width: number = 340;
    const height: number = 97;

    const [shieldList, setShieldList] = useState<Shield[]>(shields);
    const [shieldIndex, setShieldIndex] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState<number>(0);

    const [twoHandsShieldCount, setTwoHandsShieldCount] = useState<number>(0);
    const [isTwoHandsShieldCountLocked, setIsTwoHandsShieldCountLocked] = useState<boolean>(false);

    const [enableWound, setEnableWound] = useState<boolean>(false);

    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === 'q') {
            setVisible((prev) => !prev);
        }
    };

    function handleWindowResize(){
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function roleShield(divide2: boolean = false){
        const isUseTwoHandsShield: boolean = shieldList[shieldIndex].shieldArmorName.includes("両手盾"); // 両手盾が選択されているかどうか
        let minusRevision: string = showTextWithConditions(`-${twoHandsShieldCount*twoHandsShieldCountMinus}`, (isUseTwoHandsShield && twoHandsShieldCount > 0)); // 両手盾の使用時マイナス補正を計算する
        const revision: string = minusRevision + showTextWithConditions("+20", enableBigShield); // 両手盾のマイナス補正 + ビッグシールドのプラス補正
        const isCountStop: string = showTextWithConditions("以降", (twoHandsShieldCount >= twoHandsShieldCountMax)); // 両手盾のマイナス補正がカンストしているかどうか
        const countView: string = `${(twoHandsShieldCount >= twoHandsShieldCountMax) ? twoHandsShieldCountMax : twoHandsShieldCount+1}回目`// n回目
        const skillName: string = (isUseTwoHandsShield ? `【両手盾】${showTextWithConditions(`${countView}${isCountStop}`, !isTwoHandsShieldCountLocked)}` : "【盾】") // 技能名
        const roleMessage: string = `CCB<=({盾技能}${revision})${showTextWithConditions("/2", divide2)} ${skillName}` // 盾技能ロール
        const messages: string[] = [roleMessage];
        if(enableBigShield)  messages.push(":ビッグシールド-1");
        const isMessageChanged: boolean = sendCcfoliaMessage(messages);
        if(isMessageChanged && isUseTwoHandsShield && !isTwoHandsShieldCountLocked) setTwoHandsShieldCount((prev) => Math.min(prev+1, twoHandsShieldCountMax))
    }

    return (
        <div>
            {visible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        defaultPosition={{
                            x: (windowWidth - width) / 2,
                            y: -(windowHeight + (height + 16 * 3)) / 2
                        }}
                        bounds={{
                            top: -windowHeight,
                            right: (windowWidth - width),
                            bottom: -(height + 16 * 3),
                            left: 0
                        }}
                        cancel=".draggable-disable"
                    >
                        <Paper
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: "0",
                                minWidth: `${width}px`,
                                minHeight: `${height}px`,
                                paddingTop: "16px",
                                paddingBottom: "32px",
                                userSelect: "none"
                            }}
                            elevation={10}
                        >
                            <StatusLevelChange sliderValue={sliderValue} setSliderValue={setSliderValue}/>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly"
                                    }}
                                >
                                    <SelectShield
                                        shieldNames={shieldList.map(data => data.shieldName)}
                                        shieldIndex={shieldIndex}
                                        setShieldIndex={setShieldIndex}
                                    />
                                    <CalculateButton
                                        enableSpecialArmour={enableSpecialArmour}
                                        specialArmors={specialArmors}
                                        enableBigShield={enableBigShield}
                                        multiplier={multiplier}
                                        shieldName={shieldList[shieldIndex].shieldName}
                                        shieldArmourName={shieldList[shieldIndex].shieldArmorName}
                                        sliderValue={sliderValue}
                                        enableWound={enableWound}
                                    />
                                </div>
                                <AddPanelButton
                                    visibleAdditions={visibleAdditions}
                                    setVisibleAdditions={setVisibleAdditions}
                                />
                            </div>
                            {visibleAdditions && (
                                <div
                                    style={{
                                        marginLeft: "1rem"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <BigShield enableBigShield={enableBigShield} setEnableBigShield={setEnableBigShield}/>
                                        <div
                                            style={{
                                                flexGrow: 1,
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <SpecialMagnification multiplier={multiplier} setMultiplier={setMultiplier}/>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <Wound
                                            enableWound={enableWound}
                                            setEnableWound={setEnableWound}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexGrow: 1,
                                                justifyContent: "end",
                                                alignItems: "center"
                                            }}
                                        >
                                            <TwoHandsShield
                                                count={twoHandsShieldCount}
                                                setCount={setTwoHandsShieldCount}
                                                isLocked={isTwoHandsShieldCountLocked}
                                                setIsLocked={setIsTwoHandsShieldCountLocked}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <SelectSpecialArmor
                                            enableSpecialArmour={enableSpecialArmour}
                                            setEnableSpecialArmour={setEnableSpecialArmour}
                                            specialArmors={specialArmors}
                                            setSpecialArmors={setSpecialArmors}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexGrow: 1,
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Button
                                                className="draggable-disable"
                                                variant="text"
                                                onClick={()=>{
                                                    sendMessage(":MP-1 【かばう消費MP】");
                                                }}>
                                                    かばう+1
                                            </Button> 
                                            <Button
                                                className="draggable-disable"
                                                variant="text"
                                                onClick={() => roleShield()}>
                                                    盾技能
                                            </Button>
                                            <Button
                                                className="draggable-disable"
                                                style={{
                                                    marginRight: "0.5rem",
                                                    width: "2rem",
                                                    minWidth: "2rem"
                                                }}
                                                variant="text"
                                                onClick={() => roleShield(true)}>
                                                    /2
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};