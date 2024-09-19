import React from "react";
import {Field} from "./Field";
import {calculateDifference} from "../logic/game-logic";
import {id, objectMap, zip} from "../utils";
import {Keyboard} from "./Keyboard";
import {CellState, sortCellStates} from "../model/CellState";

export const App = () => {
    const length = 5;
    const correct = "guess";

    const [pastGuesses, setPastGuesses] = React.useState([]);

    const [currentGuess, setCurrentGuess] = React.useState("");

    const inputHandler = key => {
        if (currentGuess.length > 0 && key === "BACK") {
            setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
        } else if (currentGuess.length >= length) {
            if (key === "ENTER") {
                setPastGuesses(pastGuesses.concat([currentGuess]));
                setCurrentGuess("");
            } else {
                // do nothing
            }
        } else if (key.length === 1) {
            setCurrentGuess(currentGuess + key);
        }
    };

    const fieldDataForPastGuesses = pastGuesses
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
            fieldDataForPastGuesses
                .flatMap(id)
                .flatMap(id),
            cell => cell.content
        ),
        states => states
            .map(state => state.state)
            .toSorted(sortCellStates)
            .at(-1)
    );

    const fieldData = fieldDataForPastGuesses
        .concat([currentGuess
            .split("")
            .map(char => ({
                state: CellState.Unknown,
                content: char,
            }))
        ])


    return <div>
        <Field
            size={[5, 6]}
            fieldData={fieldData}
        />
        <Keyboard used={used} onKey={inputHandler}/>
    </div>
};