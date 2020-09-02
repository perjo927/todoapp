import { CONSTS } from "../actions";

const {
  actions: { ADD, DELETE, TOGGLE },
} = CONSTS;

export const addTodo = (state, newTodo) => [...state, newTodo];

export const deleteTodo = (state, id) => state.filter((todo) => todo.id !== id);

export const toggleTodo = (state, id) =>
  state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));

export const areTodosEqual = (presentTodoList, newTodoList) => {
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

const todoReducerActionMap = new Map([
  [ADD, addTodo],
  [DELETE, deleteTodo],
  [TOGGLE, toggleTodo],
]);

export const todoReducer = (state = [], action) => {
  const defaultFunction = (state) => state;
  const reduce = todoReducerActionMap.get(action.type) || defaultFunction;
  return reduce(state, action.value);
};
