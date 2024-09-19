import React from "react";
import {CellState} from "../model/CellState";
import {Key} from "./Key";

export const Keyboard = ({used}) => {
    const keys = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", null,
        "A", "S", "D", "F", "G", "H", "J", "K", "L", null,
        "ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"
    ];

    return <div className="keyboard">
        {
            keys.map((key) => {
                if (key) {
                    return <Key state={used[key] ?? CellState.Unknown} content={key} />;
                } else {
                    return <br />
                }
            })
        }
    </div>
}