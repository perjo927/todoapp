import { CONSTS } from "./actions";

// https://redux.js.org/recipes/implementing-undo-history
/*
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
const areTodosEqual = (presentTodoList, newTodoList) => {
  // If length is different a new todo has been added, nothing to do
  if (presentTodoList.length !== newTodoList.length) {
    return false;
  }
  // If length is same, one item could have flipped
  // Find a matching todo and see if one todo has been altered
  return presentTodoList.every((presentTodo) => {
    const newTodo = newTodoList.find(
      (newTodo) => newTodo.id === presentTodo.id
    );
    return presentTodo.done === newTodo.done;
  });
};

const undoable = (reducer) => {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  // Return a reducer that handles undo and redo
  return function (state = initialState, action = { value: null, type: null }) {
    const { actions } = CONSTS;
    const { past, present, future } = state;

    switch (action.type) {
      case actions.UNDO:
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };

      case actions.REDO:
        const [next] = future;
        const newFuture = future.slice(1);

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };

      default:
        // Delegate handling the present action to the passed reducer
        const newPresent = reducer(present, action) || [];

        if (areTodosEqual(present, newPresent)) {
          return state;
        }

        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
    }
  };
};

export const reducerFunctions = {
  addTodo(newTodo, state) {
    return [...state, newTodo]; // returns new array
  },
  deleteTodo(id, state) {
    return state.filter((todo) => todo.id !== id); // returns new array;
  },
  completeTodo(id, state, completed = true) {
    return state.map((todo) => {
      if (todo.id === id) {
        const newTodo = {
          // return a new object
          ...todo,
          done: completed,
        };
        return newTodo;
      }
      return todo;
    }); // returns new array
  },
  unCompleteTodo(...args) {
    return this.completeTodo(...args, false);
  },
};

// Only works on "present" state, which is a list of todos
export const rootReducer = (state = [], action) => {
  const { actions } = CONSTS;

  switch (action.type) {
    case actions.ADD:
      return reducerFunctions.addTodo(action.value, state);
    case actions.DELETE:
      return reducerFunctions.deleteTodo(action.value, state);
    case actions.COMPLETE:
      return reducerFunctions.completeTodo(action.value, state);
    case actions.UNCOMPLETE:
      return reducerFunctions.unCompleteTodo(action.value, state);
    default:
      return state;
  }
};

export const undoableReducer = undoable(rootReducer);
