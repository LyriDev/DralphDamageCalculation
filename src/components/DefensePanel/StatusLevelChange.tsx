import React from 'react';
import { Slider } from '@mui/material';

type Props = {
    sliderValue: number;
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
}

const marks = [
    {
        value: -3,
        label: '2倍',
    },
    {
        value: -2,
        label: '1.75倍',
    },
    {
        value: -1,
        label: '1.5倍',
    },
    {
        value: 0,
        label: '1倍',
    },
    {
        value: 1,
        label: '0.75倍',
    },
    {
        value: 2,
        label: '0.5倍',
    },
    {
        value: 3,
        label: '0.25倍',
    }
];

function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function StatusLevelChange({sliderValue, setSliderValue}: Props){
    return (
        <div>
            <Slider
                className="draggable-disable"
                style={{
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    width: "calc(320px - 4rem)"
                }}
                defaultValue={sliderValue}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={(value) => `${value}倍`}
                step={null}
                marks={marks}
                min={-3}
                max={3}
                onChange={(event: Event, newValue: number | number[]) => {
                    const newSliderValue: number = Array.isArray(newValue) ? newValue[0] : newValue;
                    setSliderValue(newSliderValue);
                }}
            />
        </div>
    );
};
