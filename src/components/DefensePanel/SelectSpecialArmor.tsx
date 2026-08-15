import React, { useState } from 'react';
import { FormControlLabel, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SpecialArmor } from "./../utils/types";

type Props = {
    enableSpecialArmour: boolean;
    setEnableSpecialArmour: React.Dispatch<React.SetStateAction<boolean>>;
    specialArmors: SpecialArmor[];
    setSpecialArmors: React.Dispatch<React.SetStateAction<SpecialArmor[]>>;
}

export default function SelectSpecialArmor({
    enableSpecialArmour,
    setEnableSpecialArmour,
    specialArmors,
    setSpecialArmors
}: Props){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <div>
            <FormControlLabel
                className="draggable-disable"
                style={{marginRight: 0}}
                label={
                    <div style={{display: "flex", marginRight: 0}}>
                        <span
                            style={{
                                alignItems: "center",
                                display: "flex",
                                maxWidth: "6rem",
                                overflow:"hidden",
                                textOverflow: "ellipsis",
                                textWrap: "nowrap",
                                userSelect: "none", marginRight: 0
                            }}
                        >
                            特殊装甲
                        </span>
                        <IconButton onClick={handleClick} color="inherit">
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                }
                control={
                    <Checkbox
                        checked={enableSpecialArmour}
                        onChange={() => setEnableSpecialArmour((prev) => !prev)}
                    />
                }
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        color: "#fff",
                        backgroundColor: "rgba(44, 44, 44, 0.87)"
                    }
                }}
            >
                {specialArmors.map((data, index) => (
                    <MenuItem key={index}>
                        <FormControlLabel
                            label={data.armorName}
                            control={
                                <Checkbox
                                    checked={data.enable}
                                    onChange={() => setSpecialArmors((prev) => {
                                        const newData = [...prev];
                                        newData[index].enable = !newData[index].enable;
                                        return newData;
                                    })}
                                />
                            }
                        />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};