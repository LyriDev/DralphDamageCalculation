import { Box, IconButton, Tab, Tabs } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type Props = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 編集ボタンがあるヘッダー
export default function Header(props: Props){
    const { setIsModalOpen } = props;
    const {
        tabIndex,
        setTabIndex,
        tabs,
        focusNextTab,
        focusPrevTab
    } = useContext(DataContext);

    // ボタンの disabled 判定（現在の tabIndex より前/後に enabled なタブがあるか）
    const hasPrevEnabled = tabs.some((tab, i) => i < tabIndex && tab.enabled);
    const hasNextEnabled = tabs.some((tab, i) => i > tabIndex && tab.enabled);

    return (
        <Box sx={{boxShadow: 4}}>
            <Box
                sx={{
                    height: "48px",
                    px: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>被ダメージ処理 支援ツール</div>
                <IconButton
                    className="draggable-disable"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <EditIcon/>
                </IconButton>
            </Box>
            <Box
                className="draggable-disable"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <IconButton
                    color="primary"
                    disabled={!hasPrevEnabled}
                    onClick={focusPrevTab}
                >
                    <KeyboardArrowLeftIcon/>
                </IconButton>
                <Tabs
                    style={{flexGrow: 1}}
                    value={tabIndex}
                    onChange={(_, newValue) => setTabIndex(newValue)}
                >
                    {tabs
                        // 元の物理インデックス (originalIndex) をオブジェクトに保持させてから filter
                        .map((tab, originalIndex) => ({ tab, originalIndex }))
                        .filter(({ tab }) => tab.enabled)
                        .map(({ tab, originalIndex }) => {
                            const label = tab.type === "Ride" 
                                ? (tab.data.horse.name || "乗馬タブ")
                                : (tab.data.character.name || "盾タブ");
                            return (
                                <Tab
                                    key={originalIndex}
                                    value={originalIndex} // 元の物理インデックスを指定
                                    label={label}
                                    sx={{
                                        px: "12px",
                                        py: "6px",
                                        minWidth: "3rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        display: "block"
                                    }}
                                />
                            );
                        })}
                </Tabs>
                <IconButton
                    color="primary"
                    disabled={!hasNextEnabled}
                    onClick={focusNextTab}
                >
                    <KeyboardArrowRightIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};
