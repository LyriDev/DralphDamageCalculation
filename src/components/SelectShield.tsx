import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    shieldNames: string[];
}

export default function SelectShield({value, setValue, shieldNames}: Props){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <div
            className="draggable-disable"
        >
            <Button
                onClick={handleClick}
            >
                <span
                    style={{
                        width: "3.5rem",
                        overflow:"hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap"
                    }}
                >
                    {value}
                </span>
                <ArrowDropDownIcon/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {shieldNames.map((shieldName, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            setValue(shieldName);
                            handleClose();
                        }}
                    >
                        {shieldName}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};