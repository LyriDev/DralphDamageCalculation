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
import SpecialArmor from "./SpecialArmor";

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
        shieldName: "神聖剣",
        shieldArmorName: "盾装甲"
    },
    {
        shieldName: "神聖剣2",
        shieldArmorName: "盾装甲"
    },
    {
        shieldName: "神聖剣3",
        shieldArmorName: "盾装甲"
    },
    {
        shieldName: "神聖神聖神聖剣",
        shieldArmorName: "盾装甲"
    },
]


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

    const [enableMagicArmour, setEnableMagicArmour] = useState<boolean>(false);
    const [enableBigShield, setEnableBigShield] = useState<boolean>(false);
    const [multiplier, setMultiplier] = useState<string>("100");

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const width: number = 340;
    const height: number = 97;

    const [shieldName, setShieldName] = useState<string>("盾");
    const [sliderValue, setSliderValue] = useState<number>(0);

    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === 'q') {
            setVisible((prev) => !prev);
            setShieldName("盾");
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
                                paddingBottom: "32px"
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
                                        value={shieldName}
                                        setValue={setShieldName}
                                        shieldNames={shields.map(data => data.shieldName)}
                                    />
                                    <CalculateButton
                                        enableMagicArmour={enableMagicArmour}
                                        enableBigShield={enableBigShield}
                                        multiplier={multiplier}
                                        radioValue={shieldName}
                                        sliderValue={sliderValue}
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
                                        <SpecialArmor enableMagicArmour={enableMagicArmour} setEnableMagicArmour={setEnableMagicArmour}/>
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
                                                style={{marginLeft: "0.5rem"}}
                                                variant="text"
                                                onClick={()=>{
                                                    const roleMessage: string = `CCB<=({盾技能}${enableBigShield ? "+20" : ""}) 【盾】`
                                                    const messages: string[] = enableBigShield ? [roleMessage, ":ビッグシールド-1"] : [roleMessage];
                                                    sendCcfoliaMessage(messages);
                                                }}>
                                                    盾技能
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