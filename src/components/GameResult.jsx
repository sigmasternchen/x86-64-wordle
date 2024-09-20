import React from "react";

export const GameResult = ({show, className, text, reset}) => {


    return <div className={"result " + className + " " + (show ? "show" : "")}>
        <h1>{text}</h1>
        <button onClick={reset}>New Game</button>
    </div>
}