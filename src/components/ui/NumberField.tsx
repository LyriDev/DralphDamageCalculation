import React from 'react';
import { TextField } from '@mui/material';
import { CSSProperties } from "react";

type P = {
    state: string;
    setState: (value: string) => void;
    label?: string;
    style?: CSSProperties;
    required?: boolean;
    fullWidth?: boolean;
};

export default function NumberField(props: P) {

    const onChangeHandle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const result = Math.abs(Number(e.target.value)).toString();

        if (result === "NaN") {
            props.setState("");
        } else {
            props.setState(result);
        }
    };

    const onKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
            e.preventDefault(); // キャレット移動を止める
            const num = Number(props.state) || 0;
            props.setState(String(num + 1));
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const num = Number(props.state) || 0;
            props.setState(String(num - 1));
        }
    };

    return <TextField
        className="draggable-disable"
        fullWidth={props.fullWidth}
        required={props.required}
        value={props.state}
        onChange={onChangeHandle}
        onKeyDown={onKeyDownHandle}
        label={props.label}
        style={props.style}
        inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*"
        }}
        variant="standard"
    />;
}
