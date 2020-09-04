import { CONSTS } from "../redux/actions/index";

const { ALL, DONE, IN_PROGRESS } = CONSTS.visibilityFilters;

export const getTodos = (store) => {
  const { todos } = store.getState();
  return todos?.present || [];
};

export const getVisibility = (store) => {
  const { visibility } = store.getState();
  return visibility;
};

export const getTodoAdder = (store, actions) => (todo) =>
  store.dispatch(actions.addTodo(todo));
export const getTodoToggler = (store, actions) => (id) =>
  store.dispatch(actions.toggleTodo(id));
export const getTodoDeleter = (store, actions) => (id) =>
  store.dispatch(actions.deleteTodo(id));
export const getVisibilityChanger = (store, actions) => (filter) =>
  store.dispatch(actions.setVisibility(filter));

export const getStoreMethods = (...args) => ({
  addTodo: getTodoAdder(...args),
  toggleTodo: getTodoToggler(...args),
  deleteTodo: getTodoDeleter(...args),
  changeVisibility: getVisibilityChanger(...args),
});

export const filterAll = (todo) => todo;
export const filterDone = (todo) => todo.done;
export const filterInProgress = (todo) => !todo.done;

const filterFunctionMap = new Map([
  [ALL, filterAll],
  [DONE, filterDone],
  [IN_PROGRESS, filterInProgress],
]);

export const filterTodos = (visibility, todos) => {
  const filterFunction = filterFunctionMap.get(visibility) || filterAll;
  return todos.filter(filterFunction);
};

export const hasTodos = (todos) => todos.length > 0;
