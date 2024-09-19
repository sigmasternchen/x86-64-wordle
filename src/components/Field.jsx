import React from "react";

import {range} from "../utils";
import {Cell} from "./Cell";
import {CellState} from "../model/CellState";

export const Field = ({size, fieldData}) => {
    return <div className="field">
        {
            range(size[1]).map(y =>
                range(size[0]).map(x => (
                    <Cell
                        state={fieldData?.[y]?.[x]?.state ?? CellState.Unknown}
                        content={fieldData?.[y]?.[x]?.content ?? ""}
                    />
                )).concat([<br />])
            )
        }
    </div>
};