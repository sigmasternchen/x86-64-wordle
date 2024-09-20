import React from "react";
import dictionary from "../data/dictionary.json"
import {newSFC32} from "../random/sfc32";
import {Game} from "./Game";

const validWordsRegex = /[A-Z]+/;

export const App = () => {
    const wordLength = 5;
    const numberOfGuesses = 6;

    const today = Date.now() / 1000 / 60 / 60 / 24;
    const random = newSFC32(today);


    const availableWords = dictionary
        .filter(word => validWordsRegex.test(word))
        .filter(word => word.length === wordLength);

    const correct = availableWords[Math.floor(random() * availableWords.length)];

    console.log(correct)

    return <Game
        wordLength={wordLength}
        numberOfGuesses={numberOfGuesses}
        availableWords={availableWords}
        correctWord={correct}
    />
};