import { CONSTS } from "../redux/actions/index";

const { ALL, DONE, IN_PROGRESS } = CONSTS.visibilityFilters;

export const makeRegrettable = (store, actions) => ({
  undo() {
    return store.dispatch(actions.undo());
  },
  redo() {
    return store.dispatch(actions.redo());
  },
});

export const makeTodoModifiers = (store, actions) => ({
  addTodo(todo) {
    return store.dispatch(actions.addTodo(todo));
  },
  toggleTodo(id) {
    return store.dispatch(actions.toggleTodo(id));
  },
  deleteTodo(id) {
    return store.dispatch(actions.deleteTodo(id));
  },
});

export const makeVisibilityChanger = (store, actions) => ({
  changeVisibility(filter) {
    return store.dispatch(actions.setVisibility(filter));
  },
});

export const getStoreMethods = (store, actions) => ({
  ...makeTodoModifiers(store, actions),
  ...makeVisibilityChanger(store, actions),
  ...makeRegrettable(store, actions),
});

export const getTodos = (store) => {
  const { todos } = store.getState();
  return todos?.present || [];
};

export const hasPastTodos = (store) => {
  const { todos } = store.getState();
  if (!todos) {
    return false;
  }
  return todos.past.length > 0;
};

export const hasFutureTodos = (store) => {
  const { todos } = store.getState();
  if (!todos) {
    return false;
  }
  return todos.future.length > 0;
};

export const getVisibility = (store) => {
  const { visibility } = store.getState();
  return visibility;
};

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
