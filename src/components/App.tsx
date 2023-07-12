import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import { decrementParamsWithResult } from "./../utils/rollDiceFromResult"

// ダメージ処理(HPと盾の耐久力を減少させるロール)を行う関数
function decrementHealth(useShield: boolean, shieldType: string, reductionRate: number){
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
        role = `C(((${damage})*${reductionRate}/100R)-({装甲}+{盾装甲})) 【盾ガード時被ダメージ】`;
        decrementParams.push("HP");
        decrementParams.push(shieldType);
    }else{
        role = `C(((${damage})*${reductionRate}/100R)-({装甲})) 【被ダメージ】`;
        decrementParams.push("HP");
    }

    // ダメージを計算するロールを行い、その結果を元にパラメータを減少させるロールを行う
    decrementParamsWithResult(role, decrementParams);
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
    },
});

export default function App(){
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const width = 320;
    const height = 100;

    const [radioValue, setRadioValue] = useState<string>("shield1");

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
                    >
                        <Paper
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: "0",
                                minWidth: `${width}px`,
                                minHeight: `${height}px`,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            elevation={10}
                        >
                            <FormControl>
                                <RadioGroup
                                    value={radioValue}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setRadioValue(event.target.value);
                                    }}
                                >
                                    <FormControlLabel value="盾" control={<Radio />} label="盾" checked />
                                    <FormControlLabel value="盾2" control={<Radio />} label="盾2" />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                variant="text"
                                onClick={()=>{
                                    decrementHealth(true, radioValue, 100);
                                }}>
                                    計算(盾あり)
                            </Button>
                            <Button
                                variant="text"
                                onClick={()=>{
                                    decrementHealth(false, "", 100);
                                }}>
                                    計算(盾なし)
                            </Button>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};