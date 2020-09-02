import { visibilityReducer } from "./visibility";
import { todoReducer, areTodosEqual } from "./todos";
import { getUndoableReducer } from "./undoable";
import { combineReducers } from "./combineReducers";

export const undoableTodoReducer = getUndoableReducer(
  todoReducer,
  areTodosEqual
);

export const rootReducer = combineReducers({
  todos: undoableTodoReducer,
  visibility: visibilityReducer,
});
