import React, {useState} from "react";
import {Field} from "./Field";
import {calculateDifference} from "../logic/game-logic";
import {id, objectMap, zip} from "../utils";
import {Keyboard} from "./Keyboard";
import {CellState, sortCellStates} from "../model/CellState";
import {Toast} from "./Toast";
import dictionary from "../data/dictionary.json"
import {newSFC32} from "../random/sfc32";

const validWordsRegex = /[A-Z]+/;

export const App = () => {
    const [pastGuesses, setPastGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");

    const [message, setMessage] = useState("");

    const length = 5;
    const availableWords = dictionary
        .filter(word => validWordsRegex.test(word))
        .filter(word => word.length === length);

    const today = Date.now() / 1000 / 60 / 60 / 24;
    const random = newSFC32(today);

    const correct = availableWords[Math.floor(random() * availableWords.length)];

    console.log(correct)

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

    const usedWithState = objectMap(
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

    const inputHandler = key => {
        if (key === "ENTER") {
            if (currentGuess.length === length) {
                setPastGuesses(pastGuesses.concat([currentGuess]));
                setCurrentGuess("");
            } else {
                setMessage("Not enough letters.");
            }
        } else if (key === "BACK") {
            if (currentGuess.length > 0) {
                setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
            }
        } else {
            if (currentGuess.length < length) {
                setCurrentGuess(currentGuess + key);
            }
        }
    };

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
        <Keyboard used={usedWithState} onKey={inputHandler}/>
        <Toast message={message} />
    </div>
};