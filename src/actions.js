export const CONSTS = {
  actions: {
    ADD: "ADD",
    DELETE: "DELETE",
    UNDO: "UNDO",
    REDO: "REDO",
    COMPLETE: "COMPLETE",
    UNCOMPLETE: "UNCOMPLETE",
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
  completeTodo: (id) => {
    return {
      type: CONSTS.actions.COMPLETE,
      value: id,
    };
  },
  unCompleteTodo: (id) => {
    return {
      type: CONSTS.actions.UNCOMPLETE,
      value: id,
    };
  },
  undo: () => {
    return {
      type: CONSTS.actions.UNDO,
      value: null,
    };
  },
  redo: (id) => {
    return {
      type: CONSTS.actions.REDO,
      value: null,
    };
  },
};
