import React from 'react';
import NumberFieldLabel from '../ui/NumberFieldLabel';

type Props = {
    multiplier: string;
    setMultiplier: React.Dispatch<React.SetStateAction<string>>
}

export default function SpecialMagnification({multiplier, setMultiplier}: Props){
    return (
        <NumberFieldLabel
            label="補助倍率"
            additionalLabel="%"
            value={multiplier}
            setValue={(value) => setMultiplier(value)}
            min={0}
            max={999}
        />
    );
};