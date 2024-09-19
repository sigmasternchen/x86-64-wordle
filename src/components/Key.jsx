import React from "react";

export const Key = ({state, content, onKey}) => {
    return <div className={"key " + state} onClick={() => onKey(content)}>{content}</div>
}