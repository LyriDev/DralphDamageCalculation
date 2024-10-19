import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';


type Props = {
    enableWound: boolean;
    setEnableWound: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Wound({enableWound, setEnableWound}: Props){
    return (
        <div>
            <FormControlLabel
                className="draggable-disable"
                sx={{
                    '& .MuiFormControlLabel-label': {
                        margin: 0,
                        userSelect: "none"
                    }
                }}
                label="傷"
                control={
                    <Checkbox
                        checked={enableWound}
                        onChange={() => setEnableWound((prev) => !prev)}
                    />
                }
            />
        </div>
    );
};