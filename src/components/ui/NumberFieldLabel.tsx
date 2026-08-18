import React from 'react';
import NumberField from './NumberField';

type Props = {
    label: string | string[];
    additionalLabel: string;
    value: string;
    setValue: (value: string) => void;
    min: number;
    max: number;
}

export default function NumberFieldLabel(props: Props){
    const {label, additionalLabel, value, setValue, min, max} = props;

    function setValueWithLimit(value: string){
        const num = Number(value);
        if (isNaN(num)) return;
        
        if (num < min) {
            setValue(String(props.min));
            return;
        }
        if (num > max) {
            setValue(String(props.max));
            return;
        }
        setValue(value);
    }

    function labelWithBreak(){
        if(Array.isArray(label)){
            return label.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    {index !== label.length - 1 && <br/>}
                </React.Fragment>
            ));
        }else{
            return label;
        }
    }

    return (
        <span style={{display: "flex", alignItems: "center", justifyContent: "start", height: "100%"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "0.5rem"
                }}
            >
                <div>{labelWithBreak()}</div>
                <div>:</div>
            </div>
            <NumberField
                state={value}
                setState={setValueWithLimit}
                style={{width: "3rem"}}
            />
            {additionalLabel && <span>{additionalLabel}</span>}
        </span>
    );
};
