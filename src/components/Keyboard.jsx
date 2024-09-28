import React, {useEffect} from "react";
import {CellState} from "../model/CellState";
import {Key} from "./Key";
import {id} from "../utils";

export const Keyboard = ({enabled, used, onKey}) => {
    const keys = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", null,
        "A", "S", "D", "F", "G", "H", "J", "K", "L", null,
        "ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"
    ];

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === "Enter") {
                onKey("ENTER");
            } else if (event.key === "Backspace") {
                onKey("BACK");
            } else if (event.key.length === 1 && keys.filter(id).indexOf(event.key.toUpperCase())) {
                onKey(event.key.toUpperCase());
            }
        };

        window.addEventListener("keydown", keyDownHandler);
        return () => window.removeEventListener("keydown", keyDownHandler);
    }, [onKey]);

    let newlineCounter = 0;
    return <div className={"keyboard " + (!enabled ? "disabled" : "")}>
        {
            keys.map((key) => {
                if (key) {
                    return <Key key={key} onKey={onKey} state={used[key] ?? CellState.Unknown} content={key} />;
                } else {
                    return <br key={"br-" + newlineCounter++} />
                }
            })
        }
    </div>
}