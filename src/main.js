// import a CSS module
import classes from "./main.css";

const CONSTS = {
  actions: {
    ADD: "ADD",
    DELETE: "DELETE",
    UNDO: "UNDO",
    REDO: "REDO",
    COMPLETE: "COMPLETE",
    UNCOMPLETE: "UNCOMPLETE",
  },
};

// Creates an object which properties are not writable
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
const createTodoItem = (text) =>
  Object.create(
    {},
    {
      // id: generateID
      text: { value: text },
      done: { value: false },
    }
  );

const reducer = (state, action) => {
  switch (action.type) {
    case CONSTS.actions.ADD:
      return [...state, action.value];
    case CONSTS.actions.DELETE:
      return state;
    case CONSTS.actions.UNDO:
      // TODO: Find ID
      return state;
    case CONSTS.actions.REDO:
      return state;
    case CONSTS.actions.COMPLE:
      return state;
    case CONSTS.actions.UNCOMPLETE:
      return state;
    default:
      return state;
  }
};

const actions = {
  addTodo: (todo) => {
    return {
      type: CONSTS.actions.ADD,
      value: todo,
    };
  },
};

const createStore = (initialState = {}, reducer) => {
  // retained by closure
  const stateContainer = [initialState];

  const getState = () => {
    const [lastState] = stateContainer.slice(-1); // no mutation
    return lastState;
  };

  const setState = (newState) => {
    stateContainer.push(newState);
  };

  const dispatch = (action) => {
    const newState = reducer(getState(), action);
    setState(newState); // TODO: Impure (side effect), emit event instead and assert that it was called
    return action;
  };

  // Object.create
  return {
    getState,
    dispatch,
  };
};

const newTodoItem = createTodoItem("text");

const initialState = [];
const store = createStore(initialState, reducer);
console.log(store.dispatch(actions.addTodo(newTodoItem))); // Possible composition opportunity

export default () => {
  //   console.log(classes.main);

  console.log(store.getState());
};
