import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
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
    return (
        <div>
            <FormControlLabel
                className="draggable-disable"
                label={
                    <div style={{display: "flex"}}>
                        <span
                            style={{
                                maxWidth: "6rem",
                                overflow:"hidden",
                                textOverflow: "ellipsis",
                                textWrap: "nowrap",
                                userSelect: "none"
                            }}
                        >
                            魔法装甲
                        </span>
                        <ArrowDropDownIcon/>
                    </div>
                }
                control={
                    <Checkbox
                        checked={enableSpecialArmour}
                        onChange={() => setEnableSpecialArmour((prev) => !prev)}
                    />
                }
            />
        </div>
    );
};