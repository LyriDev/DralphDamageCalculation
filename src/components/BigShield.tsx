import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';


type Props = {
    enableBigShield: boolean;
    setEnableBigShield: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BigShield({enableBigShield, setEnableBigShield}: Props){
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
                label="ビッグシールド"
                control={
                    <Checkbox
                        checked={enableBigShield}
                        onChange={() => setEnableBigShield((prev) => !prev)}
                    />
                }
            />
        </div>
    );
};