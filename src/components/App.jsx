import React, {useState} from "react";
import {Field} from "./Field";
import {calculateDifference} from "../logic/game-logic";
import {id, objectMap, zip} from "../utils";
import {Keyboard} from "./Keyboard";
import {CellState, sortCellStates} from "../model/CellState";
import {Toast} from "./Toast";
import dictionary from "../data/dictionary.json"
import {newSFC32} from "../random/sfc32";
import {GameState} from "../model/GameState";

const validWordsRegex = /[A-Z]+/;

export const App = () => {
    const [gameState, setGameState] = useState(GameState.Active);
    const [pastGuesses, setPastGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");

    const [message, setMessage] = useState("");

    const wordLength = 5;
    const numberOfGuesses = 6;
    const availableWords = dictionary
        .filter(word => validWordsRegex.test(word))
        .filter(word => word.length === wordLength);

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
            if (currentGuess.length === wordLength) {
                if (availableWords.indexOf(currentGuess) === -1) {
                    setMessage("Not in word list.");
                } else {
                    setPastGuesses(pastGuesses.concat([currentGuess]));
                    setCurrentGuess("");

                    if (currentGuess.toUpperCase() === correct.toUpperCase()) {
                        setGameState(GameState.Won);
                    } else {
                        if (pastGuesses.length === numberOfGuesses - 1) {
                            setGameState(GameState.Lost);
                        }
                    }
                }
            } else {
                setMessage("Not enough letters.");
            }
        } else if (key === "BACK") {
            if (currentGuess.length > 0) {
                setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
            }
        } else {
            if (currentGuess.length < wordLength) {
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
            size={[wordLength, numberOfGuesses]}
            fieldData={fieldData}
        />
        <Keyboard enabled={gameState === GameState.Active} used={usedWithState} onKey={inputHandler}/>
        <Toast message={message}/>
        <div className={"result won " + (gameState === GameState.Won ? "show" : "")}>You won!</div>
        <div className={"result lost " + (gameState === GameState.Lost ? "show" : "")}>You lost!</div>
    </div>
};