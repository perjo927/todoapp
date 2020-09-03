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
  addTodo: (todo) => {
    return {
      type: CONSTS.actions.ADD,
      value: todo,
    };
  },
  deleteTodo: (id) => {
    return {
      type: CONSTS.actions.DELETE,
      value: id,
    };
  },
  toggleTodo: (id) => {
    return {
      type: CONSTS.actions.TOGGLE,
      value: id,
    };
  },
  undo: () => {
    return {
      type: CONSTS.actions.UNDO,
      value: null,
    };
  },
  redo: () => {
    return {
      type: CONSTS.actions.REDO,
      value: null,
    };
  },
  setVisibility: (filter) => ({
    type: CONSTS.actions.SET_VISIBILITY,
    value: filter,
  }),
};
