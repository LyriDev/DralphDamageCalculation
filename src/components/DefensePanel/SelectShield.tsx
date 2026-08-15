import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    shieldNames: string[];
    shieldIndex: number;
    setShieldIndex:  (value: React.SetStateAction<number>) => void
}

export default function SelectShield({shieldNames, shieldIndex, setShieldIndex}: Props){
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
                    {shieldNames[shieldIndex]}
                </span>
                <ArrowDropDownIcon/>
            </Button>
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
                {shieldNames.map((shieldName, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            setShieldIndex(index);
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