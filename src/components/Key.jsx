import React from "react";

export const Key = ({state, content}) => {
    return <div className={"key " + state}>{content}</div>
}