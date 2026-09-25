import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import Header from "./Header";
import DefensePanel from "./DefensePanel/DefensePanel";
import EditModal from "./EditModal/EditModal";

const theme = createTheme({
    palette: {
        primary: { main: "#fff",  },
        secondary: { main: "rgba(0,0,0,0)" },
        info: { main: "rgb(33, 150, 243)" },
        action: {
            disabled: "gray"
        }
    },
    typography: { button: { textTransform: "none", fontWeight: 'bold' } },
    components: {
        MuiRadio: { styleOverrides: { root: { color: 'white' } } },
        MuiSlider: { styleOverrides: { markLabel: { color: 'white' } } },
        MuiCheckbox: { styleOverrides: { root: { color: 'white' } } },
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: "rgba(44, 44, 44, 0.87)"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    // color: "lightgray",
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                    '& .MuiInput-input': { color: 'white' }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "gray", // フォーカスされてない時のラベル
                    "&.Mui-focused.MuiInputLabel-shrink": { color: "rgb(33, 150, 243)" }, // shrink時
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    color: "lightgray", // 入力文字色
                    "&::placeholder": {
                        color: "darkgray", // placeholder
                        opacity: 1,
                    },
                },
                underline: {
                    "&:before": { borderBottomColor: "gray" }, // 未フォーカス時の下線
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: "white" }, // hover時
                    "&:after": { borderBottomColor: "rgb(33, 150, 243)" }, // フォーカス時
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#bdbdbd", // 非アクティブなタブの文字色を指定
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "#f50057", // 下線の色を赤に設定
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    color: "#fff",
                    backgroundColor: "rgba(44, 44, 44, 0.87)" // Menuコンポーネントの背景色を設定
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "white", // 入力文字を白に
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(166, 166, 166)", // 通常時の枠線を灰色に
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // ホバー時の枠線も白に
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(33, 150, 243)", // フォーカス時（shrink時）は青に
                    },
                    "& .MuiSelect-icon": {
                        color: "white",
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#fff", // 通常時のアイコン色を白に
                    "&.Mui-disabled": {
                        // color: "rgba(255, 255, 255, 0.3)" // disabled時の色
                    }
                }
            }
        }
    }
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const width: number = 340;
    const height: number = 265;

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

    return (
        <>
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
                                userSelect: "none"
                            }}
                            elevation={10}
                        >
                            <Header setIsModalOpen={setIsModalOpen}/>
                            <div
                                style={{
                                    padding: "1rem"
                                }}
                            >
                                <DefensePanel/>
                            </div>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
            <EditModal
                theme={theme}
                isOpen={isModalOpen}
                closeModal={() => {
                    // saveData();
                    setIsModalOpen(false);
                    // setEditTabIndex(0);
                }}
            />
        </>
    );
};