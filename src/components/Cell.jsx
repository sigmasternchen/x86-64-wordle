import React from "react";

export const Cell = ({state, content}) => {
    return <div className={"cell " + state}>
        <span>{content}</span>
    </div>
}