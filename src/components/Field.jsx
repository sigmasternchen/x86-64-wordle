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
                        key={x + "-" + "y"}
                        state={fieldData?.[y]?.[x]?.state ?? CellState.Empty}
                        content={fieldData?.[y]?.[x]?.content ?? " "}
                    />
                )).concat([<br key={y + "br"} />])
            )
        }
    </div>
};