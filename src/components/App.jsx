import React from "react";
import {Field} from "./Field";
import {calculateDifference} from "../logic/game-logic";
import {id, objectMap, zip} from "../utils";
import {Keyboard} from "./Keyboard";
import {sortCellStates} from "../model/CellState";

export const App = () => {
    const correct = "guess";
    const guesses = [
        "ascii",
        "eager",
        "faces",
        "guess",
    ];

    const fieldData = guesses
        .map(guess => guess.toUpperCase())
        .map(guess => [
            guess.split(""),
            calculateDifference(correct.toUpperCase(), guess)
        ])
        .map(([guess, difference]) => zip(guess, difference))
        .map(guessWithDifference => guessWithDifference
            .map(([content, state]) => ({
                state: state,
                content: content,
            }))
        );

    const used = objectMap(
        Object.groupBy(
            fieldData
                .flatMap(id)
                .flatMap(id),
            cell => cell.content
        ),
        states => states
            .map(state => state.state)
            .toSorted(sortCellStates)
            .at(-1)
    );


    return <div>
        <Field
            size={[5, 6]}
            fieldData={fieldData}
        />
        <Keyboard used={used} />
    </div>
};