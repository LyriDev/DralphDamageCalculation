import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export default function App(){
    const [isVisible, setIsVisible] = useState(false);
    const width = 300;
    const height = 50;

    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === 'q') {
            setIsVisible((prev) => !prev);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <Draggable
                    defaultPosition={{
                        x: (window.innerWidth - width) / 2,
                        y: -(window.innerHeight + height) / 2
                    }}
                    bounds={{
                        top: -window.innerHeight,
                        right: (window.innerWidth - width),
                        bottom: -height,
                        left: 0
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            color: "#fff",
                            backgroundColor: 'rgba(44, 44, 44, 0.87)',
                            boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
                            minWidth: `${width}px`,
                            minHeight: `${height}px`,
                        }}
                    >
                        <p>ドラッグで移動したい要素</p>
                    </div>
                </Draggable>
            )}
        </div>
    );
};