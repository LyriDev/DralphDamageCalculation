import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';

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
                                    <FormControlLabel value="shield1" control={<Radio />} label="盾1" />
                                    <FormControlLabel value="shield2" control={<Radio />} label="盾2" />
                                </RadioGroup>
                            </FormControl>
                            <Button variant="text">計算(盾あり)</Button>
                            <Button variant="text">計算(盾なし)</Button>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};