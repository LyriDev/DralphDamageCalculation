import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControl, FormControlLabel, RadioGroup, Radio, Slider, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import { decrementParamsWithResult } from "./../utils/rollDiceFromResult"
import AddPanelButton from "./AddPanelButton"
import NumericField from "./NumericField"
import { sendCcfoliaMessage, sendMessage } from '../utils/sendCcfoliaMessage';

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
    const damage: string = window.prompt(dialog);

    // ダメージ入力が不正な値の場合、処理をやめる
    if((isNaN(Number(damage)) || (damage === "") || (damage === null))) return;

    // ユーザーが入力したダメージを元に計算を行うロールの文字列を作成する
    if(useShield){
        const shieldArmor: string = enableBigShield ? "({盾装甲}*3/2R)" : "{盾装甲}";
        role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)-({装甲}+${shieldArmor}+${enableMagicArmour ? "+{魔法装甲}" : ""})) 【盾ガード時被ダメージ】`;
        decrementParams.push("HP");
        decrementParams.push(shieldType);
    }else{
        role = `C(((${damage})*${reductionRate * 100}${(additionalRate === 100) ? "/100" : `*${additionalRate}/10000`}R)-({装甲}+${enableMagicArmour ? "+{魔法装甲}" : ""})) 【被ダメージ】`;
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

const marks = [
    {
        value: -3,
        label: '2倍',
    },
    {
        value: -2,
        label: '1.75倍',
    },
    {
        value: -1,
        label: '1.5倍',
    },
    {
        value: 0,
        label: '1倍',
    },
    {
        value: 1,
        label: '0.75倍',
    },
    {
        value: 2,
        label: '0.5倍',
    },
    {
        value: 3,
        label: '0.25倍',
    }
];

function valuetext(value: number) {
    return `${value}倍`;
}

function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAdditions, setVisibleAdditions] = useState<boolean>(false);

    const [enableMagicArmour, setEnableMagicArmour] = useState<boolean>(false);
    const [enableBigShield, setEnableBigShield] = useState<boolean>(false);
    const [multiplier, setMultiplier] = useState<string>("100");

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const width: number = 320;
    const height: number = 167;

    const [radioValue, setRadioValue] = useState<string>("盾");
    const [sliderValue, setSliderValue] = useState<number>(0);

    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === 'q') {
            setVisible((prev) => !prev);
            setRadioValue("盾");
            setSliderValue(0);
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

    return (
        <div>
            {visible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        defaultPosition={{
                            x: (windowWidth - width) / 2,
                            y: -(windowHeight + height) / 2
                        }}
                        bounds={{
                            top: -windowHeight,
                            right: (windowWidth - width),
                            bottom: -height,
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
                            }}
                            elevation={10}
                        >
                            <div
                                style={{
                                    paddingTop: "1rem"
                                }}
                            >
                                <Slider
                                    className="draggable-disable"
                                    style={{
                                        marginLeft: "2rem",
                                        marginRight: "2rem",
                                        width: "calc(320px - 4rem)"
                                    }}
                                    defaultValue={sliderValue}
                                    valueLabelFormat={valueLabelFormat}
                                    getAriaValueText={valuetext}
                                    step={null}
                                    marks={marks}
                                    min={-3}
                                    max={3}
                                    onChange={(event: Event, newValue: number) => {
                                        setSliderValue(newValue);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginLeft: "2rem",
                                    marginRight: "2rem"
                                }}
                            >
                                <div
                                    style={{
                                        userSelect: "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <FormControl
                                        className="draggable-disable"
                                    >
                                        <RadioGroup
                                            value={radioValue}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setRadioValue(event.target.value);
                                            }}
                                        >
                                            <FormControlLabel value="盾" control={<Radio />} label="盾"/>
                                            <FormControlLabel value="盾2" control={<Radio />} label="盾2"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            textAlign: "center"
                                        }}
                                    >
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
                                </div>
                                {visibleAdditions && (<div
                                    style={{
                                        userSelect: "none",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <FormControl
                                        className="draggable-disable"
                                    >
                                        <RadioGroup
                                            value={radioValue}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setRadioValue(event.target.value);
                                            }}
                                        >
                                            <FormControlLabel value="神聖剣" control={<Radio />} label="神聖剣"/>
                                            <FormControlLabel value="神聖剣2" control={<Radio />} label="神聖剣2"/>
                                            <FormControlLabel value="神聖剣3" control={<Radio />} label="神聖剣3"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <div style={{alignItems: "center"}}>
                                        <div>
                                            <FormControlLabel
                                                className="draggable-disable"
                                                label="魔法装甲"
                                                control={
                                                    <Checkbox
                                                        checked={enableMagicArmour}
                                                        onChange={() => setEnableMagicArmour((prev) => !prev)}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                className="draggable-disable"
                                                label="ビッグシールド"
                                                control={
                                                    <Checkbox
                                                        checked={enableBigShield}
                                                        onChange={() => setEnableBigShield((prev) => !prev)}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <span>補助倍率:&nbsp;</span>
                                            <NumericField
                                                state={multiplier}
                                                setState={setMultiplier}
                                                style={{width: "3rem"}}
                                            />
                                            <span>%</span>
                                        </div>
                                        <div style={{marginTop: "0.5rem"}}>
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
                                                style={{marginLeft: "0.5rem"}}
                                                variant="text"
                                                onClick={()=>{
                                                    sendCcfoliaMessage(["CCB<=({盾技能}+20) 【盾】", ":ビッグシールド-1"]);
                                                }}>
                                                    盾技能
                                            </Button> 
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <AddPanelButton
                                visibleAdditions={visibleAdditions}
                                setVisibleAdditions={setVisibleAdditions}
                            />
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};


{/*                                         <FormControlLabel
                                            className="draggable-disable"
                                            label="魔法装甲"
                                            control={
                                                <Checkbox
                                                    checked={enableMagicArmour}
                                                    onChange={() => setEnableMagicArmour((prev) => !prev)}
                                                />
                                            }
                                        />
                                        <Button
                                            className="draggable-disable"
                                            variant="text"
                                            onClick={()=>{
                                                
                                            }}>
                                                盾技能
                                        </Button> */}