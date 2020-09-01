// import a CSS module
import classes from "./main.css";
import { v4 as uuidv4 } from "uuid";
import { createStore } from "./store";
import { actions } from "./actions";
import { undoableReducer } from "./reducer";

// Creates an object which properties are not writable
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
const createTodoItem = (text) => {
  return { text, done: false, id: uuidv4() };
};

const newTodoItem = createTodoItem("text");
const { id } = newTodoItem;

const initialState = undoableReducer();

const store = createStore(initialState, undoableReducer);

store.dispatch(actions.addTodo(newTodoItem)); // Possible composition opportunity
store.dispatch(actions.completeTodo(id));
store.dispatch(actions.unCompleteTodo(id));
store.dispatch(actions.undo());
store.dispatch(actions.redo());
store.dispatch(actions.deleteTodo(id));
console.log("state after delete", store.getState());

export default () => {
  //   console.log(classes.main);
};
