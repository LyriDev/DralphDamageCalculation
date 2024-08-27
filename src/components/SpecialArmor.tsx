import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    enableMagicArmour: boolean;
    setEnableMagicArmour: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpecialArmor({enableMagicArmour, setEnableMagicArmour}: Props){
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
                        checked={enableMagicArmour}
                        onChange={() => setEnableMagicArmour((prev) => !prev)}
                    />
                }
            />
        </div>
    );
};