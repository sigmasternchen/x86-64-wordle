import React from "react";

export const SetupScreen = ({dictionary, selectLength}) => {

    const lengthsMap = Object.groupBy(
        dictionary,
        word => word.length
    );

    const lengths = Object.keys(lengthsMap)
        .map(length => [length, lengthsMap[length].length]);

    return <div className="setup">
        <h2>Select word length</h2>
        <ul>
        {lengths.map(([length, numberOfWordsWithLength]) =>
            <li key={length} onClick={() => selectLength(parseInt(length))}>
                {length} <span>({numberOfWordsWithLength} words)</span>
            </li>
        )}
        </ul>
    </div>;
}