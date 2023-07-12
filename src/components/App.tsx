import React, { useState, useEffect, useRef } from 'react';
import { Paper, Button, FormControl, FormControlLabel, RadioGroup, Radio, Slider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import { decrementParamsWithResult } from "./../utils/rollDiceFromResult"

// ダメージ処理(HPと盾の耐久力を減少させるロール)を行う関数
function decrementHealth(useShield: boolean, shieldType: string, reductionRate: number): void{
    let role: string = "";
    let dialog: string = "";
    let decrementParams: string[] = new Array;

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
        role = `C(((${damage})*${reductionRate*100}/100R)-({装甲}+{盾装甲})) 【盾ガード時被ダメージ】`;
        decrementParams.push("HP");
        decrementParams.push(shieldType);
    }else{
        role = `C(((${damage})*${reductionRate*100}/100R)-({装甲})) 【被ダメージ】`;
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
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const [width, setWidth] = useState<number>(320);
    const [height, setHeight] = useState<number>(100);
    const appRef = useRef(null);
    useEffect(() => {
        if(appRef && appRef.current){
            const newWidth: number = appRef.current.width || 320;
            const newHeight: number = appRef.current.Height || 100;
            setWidth(newWidth);
            setHeight(newHeight);
        }
    }, [appRef])

    const [radioValue, setRadioValue] = useState<string>("盾");
    const [sliderValue, setSliderValue] = useState<number>(0);

    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === 'q') {
            setIsVisible((prev) => !prev);
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
            {isVisible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        ref={appRef}
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
                                minWidth: "320px",
                                minHeight: "100px",
                            }}
                            elevation={10}
                        >
                            <div>
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
                                    display: "flex",
                                    justifyContent: "center",
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
                                        <FormControlLabel value="盾" control={<Radio />} label="盾" />
                                        <FormControlLabel value="盾2" control={<Radio />} label="盾2" />
                                    </RadioGroup>
                                </FormControl>
                                <div>
                                    <Button
                                        className="draggable-disable"
                                        variant="text"
                                        onClick={()=>{
                                            const reductionRate: number = getReductionRate(sliderValue);
                                            decrementHealth(true, radioValue, reductionRate);
                                        }}>
                                            計算(盾あり)
                                    </Button>
                                    <Button
                                        className="draggable-disable"
                                        variant="text"
                                        onClick={()=>{
                                            const reductionRate: number = getReductionRate(sliderValue);
                                            decrementHealth(false, "", reductionRate);
                                        }}>
                                            計算(盾なし)
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};