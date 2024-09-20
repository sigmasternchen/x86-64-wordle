import React, {useState} from "react";
import {GameState} from "../model/GameState";
import {calculateDifference} from "../logic/game-logic";
import {id, objectMap, zip} from "../utils";
import {CellState, sortCellStates} from "../model/CellState";
import {Field} from "./Field";
import {Keyboard} from "./Keyboard";
import {Toast} from "./Toast";
import {GameResult} from "./GameResult";

export const Game = ({wordLength, numberOfGuesses, correctWord, availableWords, reset}) => {
    const [gameState, setGameState] = useState(GameState.Active);
    const [pastGuesses, setPastGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");

    const [message, setMessage] = useState("");

    const fieldDataForPastGuesses = pastGuesses
        .map(guess => guess.toUpperCase())
        .map(guess => [
            guess.split(""),
            calculateDifference(correctWord.toUpperCase(), guess)
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

                    if (currentGuess.toUpperCase() === correctWord.toUpperCase()) {
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

    const resetHandler = () => {
        setGameState(GameState.Active);
        setPastGuesses([]);
        setCurrentGuess("")

        reset();
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
        <GameResult reset={resetHandler} show={gameState === GameState.Won} className={"won"} text={"You won!"} />
        <GameResult reset={resetHandler} show={gameState === GameState.Lost} className={"lost"} text={"You lost!"} />
    </div>
}