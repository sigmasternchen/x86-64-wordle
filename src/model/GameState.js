import {makeEnum} from "../utils";

export const GameState = makeEnum([
    "Setup",
    "Active",
    "Won",
    "Lost"
]);