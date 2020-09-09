export const CONSTS = {
  actions: {
    ADD: "ADD",
    DELETE: "DELETE",
    UNDO: "UNDO",
    REDO: "REDO",
    TOGGLE: "TOGGLE",
    SET_VISIBILITY: "SET_VISIBILITY",
  },
  visibilityFilters: {
    ALL: "ALL",
    DONE: "DONE",
    IN_PROGRESS: "IN_PROGRESS",
  },
};

export const actions = {
  addTodo: (todo) => ({
    type: CONSTS.actions.ADD,
    value: todo,
  }),
  deleteTodo: (id) => ({
    type: CONSTS.actions.DELETE,
    value: id,
  }),
  toggleTodo: (id) => ({
    type: CONSTS.actions.TOGGLE,
    value: id,
  }),
  undo: () => ({
    type: CONSTS.actions.UNDO,
    value: null,
  }),
  redo: () => ({
    type: CONSTS.actions.REDO,
    value: null,
  }),
  setVisibility: (filter) => ({
    type: CONSTS.actions.SET_VISIBILITY,
    value: filter,
  }),
};
