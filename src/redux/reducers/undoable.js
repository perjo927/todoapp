import { CONSTS } from "../actions";

const {
  actions: { UNDO, REDO },
} = CONSTS;

/*
    Read more at:
    https://redux.js.org/recipes/implementing-undo-history

    # Handling Undo
    1. Remove the last element from the past.
    2. Set the present to the element we removed in the previous step.
    3. Insert the old present state at the beginning of the future.

    # Handling Redo
    1. Remove the first element from the future.
    2. Set the present to the element we removed in the previous step.
    3. Insert the old present state at the end of the past.

    # Handling Other Actions
    1. Insert the present at the end of the past.
    2. Set the present to the new state after handling the action.
    3. Clear the future.

*/
export const undo = ({ past, present, future }) => {
  const previous = past[past.length - 1];
  const newPast = past.slice(0, past.length - 1);

  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
};

export const redo = ({ past, present, future }) => {
  const [next] = future;
  const newFuture = future.slice(1);

  return {
    past: [...past, present],
    present: next,
    future: newFuture,
  };
};

export const defaultReduce = (state, reducer, action, areEqual) => {
  const { past, present } = state;
  const newPresent = reducer(present, action) || [];

  return areEqual(present, newPresent)
    ? state
    : {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
};

export const undoReducerActionMap = new Map([
  [UNDO, undo],
  [REDO, redo],
]);

export const getUndoableReducer = (reducer, areEqual) => {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  // Return a reducer that handles undo and redo
  return (state = initialState, action = { value: null, type: null }) => {
    const defaultReducerFunction = defaultReduce;
    const reducerFunction = undoReducerActionMap.get(action.type);
    return reducerFunction
      ? reducerFunction(state)
      : defaultReducerFunction(state, reducer, action, areEqual);
  };
};
