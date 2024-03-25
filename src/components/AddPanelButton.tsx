import React from 'react';
import { IconButton  } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export default function AddPanelButton({
    visibleAdditions,
    setVisibleAdditions
}: {
    visibleAdditions: boolean,
    setVisibleAdditions: React.Dispatch<React.SetStateAction<boolean>>
}){
    return (
        <div
            style={{
                textAlign: "right"
            }}
        >
            <IconButton
                color="primary"
                className="draggable-disable"
                onClick={() => setVisibleAdditions((prev) => !prev)}
            >
                {visibleAdditions ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
            </IconButton>
        </div>
    );
};