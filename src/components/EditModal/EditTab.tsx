import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import { TabDataMap } from "../../utils/types";
import NumberFieldLabel from "../ui/NumberFieldLabel";

const characterLabels: Record<keyof TabDataMap, string> = {
    Guard: "キャラクター名",
    Ride: "騎乗者名"
};

export default function EditTab({index}: {index: number}){
    const {
        tabs,
        removeTab,
        swapTab,
        toggleTabEnabled,
        setTabType,
        setCharacterName,
        toggleCharacterName,
        setHorseName,
        setDexBoost
    } = useContext(DataContext);
    const tab = tabs[index];

    // タブが存在しない場合は何も描画しない（削除時のクラッシュ防止）
    if (!tab) return null;

    return (
        <Box
            sx={{
                border: "1px rgb(166, 166, 166) solid",
                borderRadius: 1,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3
                    }}
                >
                    <FormControlLabel
                        label={<span style={{ userSelect: "none" }}>有効にする</span>}
                        control={
                            <Checkbox
                                checked={tab.enabled}
                                onChange={() => toggleTabEnabled(index)}
                            />
                        }
                    />
                    <FormControl>
                        <InputLabel id="tab-type-label">タブ種別</InputLabel>
                        <Select
                            labelId="tab-type-label"
                            id="tab-type"
                            value={tab.type}
                            label="タブ種別"
                            sx={{ width: "6rem" }}
                            onChange={(event) => {
                                const value = event.target.value as keyof TabDataMap;
                                setTabType(index, value);
                            }}
                        >
                            <MenuItem value="Guard">盾</MenuItem>
                            <MenuItem value="Ride">乗馬</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <IconButton
                        disabled={index === 0}
                        onClick={() => {swapTab(index, index - 1)}}
                    >
                        <KeyboardDoubleArrowUpIcon/>
                    </IconButton>
                    <IconButton
                        disabled={index >= tabs.length - 1}
                        onClick={() => {swapTab(index, index + 1)}}
                    >
                        <KeyboardDoubleArrowDownIcon/>
                    </IconButton>
                    <Button
                        disabled={tabs.length <= 1}
                        onClick={() => {
                            if (window.confirm("本当に削除しますか？")) removeTab(index);
                        }}
                    >
                        削除
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}
            >
                <TextField style={{width: "10rem"}}
                    disabled={tab.data.character.name === null}
                    label={characterLabels[tab.type]}
                    variant="standard"
                    value={tab.data.character.name ?? ""}
                    onChange={(event) => {setCharacterName(index, event.target.value)}}
                />
                {tab.type === "Guard" && (
                    <FormControlLabel
                        label={<span style={{ userSelect: "none" }}>現在選択中のキャラコマ名で使用する</span>}
                        control={
                            <Checkbox
                                checked={tab.data.character.name === null}
                                onChange={() => toggleCharacterName(index)}
                            />
                        }
                    />
                )}
            </Box>
            {tab.type === "Ride" && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3
                    }}
                >
                    <TextField style={{width: "10rem"}}
                        disabled={tab.data.character.name === null}
                        label="馬名"
                        variant="standard"
                        value={tab.data.horse.name ?? ""}
                        onChange={(event) => {setHorseName(index, event.target.value)}}
                    />
                    <NumberFieldLabel
                        label="騎乗時DEX補正"
                        additionalLabel=""
                        value={tab.data.horse.dexBoost}
                        setValue={(value) => setDexBoost(index, value)}
                        min={0}
                        max={999}
                    />
                </Box>
            )}
        </Box>
    );
}
