import {CellState} from "../model/CellState";

export const calculateDifference = (correct, guess) => {
    const result = Array(correct.length);
    for (let i = 0; i < correct.length; i++) {
        if (correct[i] === guess[i]) {
            result[i] = CellState.Right;
        } else if (correct.indexOf(guess[i]) !== -1) {
            result[i] = CellState.HalfRight;
        } else {
            result[i] = CellState.Wrong;
        }
    }
    return result;
}