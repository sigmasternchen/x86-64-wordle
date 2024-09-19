import {makeEnum} from "../utils";

export const CellState = makeEnum([
   "Unknown",
   "Wrong",
   "HalfRight",
   "Right"
]);

const cellStateOrder = (cellState) => {
   switch (cellState) {
      case CellState.Unknown: return 0;
      case CellState.Wrong: return 1;
      case CellState.HalfRight: return 2;
      case CellState.Right: return 3;
      default: return 0;
   }
}

export const sortCellStates = (a, b) => {
   if (cellStateOrder(a) > cellStateOrder(b)) {
      return 1;
   } else {
      return -1;
   }
}