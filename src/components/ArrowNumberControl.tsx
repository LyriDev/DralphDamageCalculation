import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

type Prop = {
    countMax: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    isLocked: boolean;
}

export default function ArrowNumberControl({countMax, setCount, isLocked}: Prop) {
    return (
            <div
                className="draggable-disable"
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <IconButton
                    color="inherit"
                    style={{padding: 0}}
                    onClick={() => {
                        if(!isLocked) setCount((prev) => (Math.min((prev + 1), countMax)))
                    }}
                >
                    <ArrowDropUpIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    style={{padding: 0}}
                    onClick={() => {
                        if(!isLocked) setCount((prev) => (Math.max((prev - 1), 0)))
                    }}
                >
                    <ArrowDropDownIcon />
                </IconButton>
            </div>
    );
}