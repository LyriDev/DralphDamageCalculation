import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import { TabDataMap } from "../../utils/types";

const characterLabels: Record<keyof TabDataMap, string> = {
    Guard: "キャラクター名",
    Ride: "騎乗者名"
};

export default function EditTab({index}: {index: number}){
    const {
        tabs,
        toggleTabEnabled,
        setTabType,
        setCharacterName,
        toggleCharacterName
    } = useContext(DataContext);

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
                    flexDirection: "row",
                    gap: 3
                }}
            >
                <FormControlLabel
                    label={<span style={{ userSelect: "none" }}>有効にする</span>}
                    control={
                        <Checkbox
                            checked={tabs[index].enabled}
                            onChange={() => toggleTabEnabled(index)}
                        />
                    }
                />
                <FormControl>
                    <InputLabel id="tab-type-label">タブ種別</InputLabel>
                    <Select
                        labelId="tab-type-label"
                        id="tab-type"
                        value={tabs[index].type}
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}
            >
                <TextField style={{width: "10rem"}}
                    disabled={tabs[index].data.characterName === null}
                    label={characterLabels[tabs[index].type]}
                    variant="standard"
                    value={tabs[index].data.characterName ?? ""}
                    onChange={(event) => {setCharacterName(index, event.target.value)}}
                />
                <FormControlLabel
                    label={<span style={{ userSelect: "none" }}>現在選択中のキャラコマ名で使用する</span>}
                    control={
                        <Checkbox
                            checked={tabs[index].data.characterName === null}
                            onChange={() => toggleCharacterName(index)}
                        />
                    }
                />
            </Box>
        </Box>
    );
}
