import React from 'react';
import { IconButton  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


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
                {visibleAdditions ? <RemoveIcon/> : <AddIcon/>}
            </IconButton>
        </div>
    );
};