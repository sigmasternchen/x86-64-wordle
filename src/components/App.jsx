import React, {useState} from "react";
import dictionary from "../data/dictionary.json"
import {newSFC32} from "../random/sfc32";
import {Game} from "./Game";
import {SetupScreen} from "./SetupScreen";

const validWordsRegex = /[A-Z]+/;

export const App = () => {
    const [wordLength, setWordLength] = useState(null);
    const numberOfGuesses = 6;

    const today = Date.now() / 1000 / 60 / 60 / 24;
    const random = newSFC32(today);

    const availableWords = dictionary
        .filter(word => validWordsRegex.test(word))
        .filter(word => word.length === wordLength);

    const correct = availableWords[Math.floor(random() * availableWords.length)];

    console.log(correct)

    return <>
        <h1>x86-64 Wordle</h1>
        { wordLength === null ?
            <SetupScreen
                dictionary={dictionary}
                selectLength={setWordLength}
            /> :
            <Game
                wordLength={wordLength}
                reset={() => setWordLength(null)}
                numberOfGuesses={numberOfGuesses}
                availableWords={availableWords}
                correctWord={correct}
            />
        }
    </>
};