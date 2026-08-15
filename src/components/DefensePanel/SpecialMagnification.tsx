import React from 'react';
import NumericField from "./NumericField"

type Props = {
    multiplier: string;
    setMultiplier: React.Dispatch<React.SetStateAction<string>>
}

export default function SpecialMagnification({multiplier, setMultiplier}: Props){
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span>補助倍率:&nbsp;</span>
            <NumericField
                state={multiplier}
                setState={setMultiplier}
                style={{width: "3rem"}}
            />
            <span>%</span>
        </div>
    );
};