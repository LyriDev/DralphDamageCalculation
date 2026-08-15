import React from 'react';
import ArrowNumberControl from './ArrowNumberControl';
import { IconButton } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { twoHandsShieldCountMax } from './App';

type Props = {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    isLocked: boolean;
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TwoHandsShield({count, setCount, isLocked, setIsLocked}: Props){
    return (
        <>
            <span>
                両手盾:&nbsp;<span style={{display: "inline-block", width: "1.5rem", textAlign: "center"}}>{count}</span>回
            </span>
            <span style={{marginRight: "0.5rem"}}/>
            <ArrowNumberControl
                countMax={twoHandsShieldCountMax}
                setCount={setCount}
                isLocked={isLocked}
            />
            <span style={{marginRight: "0.5rem"}}/>
            <IconButton
                color="primary"
                className="draggable-disable"
                onClick={() => setCount(0)}
            >
                <RotateLeftIcon/>
            </IconButton>
            <IconButton
                color="primary"
                className="draggable-disable"
                onClick={() => {
                    setIsLocked((prev) => !prev);
                    setCount(0);
                }}
            >
                {isLocked ? <LockIcon/> : <LockOpenIcon/>}
            </IconButton>
            <span style={{marginRight: "1rem"}}/>
        </>
    );
};