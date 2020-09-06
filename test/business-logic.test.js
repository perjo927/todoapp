import {
  makeRegrettable,
  makeTodoModifiers,
  makeVisibilityChanger,
  getStoreMethods,
  getTodos,
  hasPastTodos,
  hasTodos,
  hasFutureTodos,
  getVisibility,
  filterAll,
  filterDone,
  filterInProgress,
  filterTodos,
} from "../src/business-logic/index.js";
import assert from "assert";

describe("business logic", () => {
  describe("index.js", () => {
    describe("makeRegrettable", () => {
      it("returns an object with undo and redo", () => {
        const store = {};
        const actions = {};
        const regrettable = makeRegrettable(store, actions);

        assert.equal(regrettable.hasOwnProperty("undo"), true);
        assert.equal(regrettable.hasOwnProperty("redo"), true);
      });

      it("undo dispatches an undo action through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false };

        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "undone";
          },
        };
        const actions = {
          undo: () => {
            spyOnActions.called = true;
          },
        };
        const regrettable = makeRegrettable(store, actions);
        const expected = "undone";
        const actual = regrettable.undo();

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
      });

      it("redo dispatches an undo action through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false };

        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "redone";
          },
        };
        const actions = {
          redo: () => {
            spyOnActions.called = true;
          },
        };
        const regrettable = makeRegrettable(store, actions);
        const expected = "redone";
        const actual = regrettable.redo();

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
      });
    });

    describe("makeTodoModifiers", () => {
      it("returns an object with addTodo, toggleTodo and deleteTodo", () => {
        const store = {};
        const actions = {};
        const todoModifiers = makeTodoModifiers(store, actions);

        assert.equal(todoModifiers.hasOwnProperty("addTodo"), true);
        assert.equal(todoModifiers.hasOwnProperty("deleteTodo"), true);
        assert.equal(todoModifiers.hasOwnProperty("toggleTodo"), true);
      });

      it("addTodo dispatches an add todo action with an argument, through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false };
        const todo = "todo";
        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "added_todo";
          },
        };
        const actions = {
          addTodo: (arg) => {
            spyOnActions.called = true;
            spyOnActions.arg = arg;
          },
        };

        const todoModifiers = makeTodoModifiers(store, actions);
        const expected = "added_todo";
        const actual = todoModifiers.addTodo(todo);

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
        assert.equal(spyOnActions.arg, "todo");
      });

      it("toggleTodo dispatches a toggle todo action with an id argument, through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false };
        const id = 1;
        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "toggled_todo";
          },
        };
        const actions = {
          toggleTodo: (arg) => {
            spyOnActions.called = true;
            spyOnActions.arg = arg;
          },
        };

        const todoModifiers = makeTodoModifiers(store, actions);
        const expected = "toggled_todo";
        const actual = todoModifiers.toggleTodo(id);

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
        assert.equal(spyOnActions.arg, 1);
      });

      it("deleteTodo dispatches a delete todo action with an id argument, through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false };
        const id = 1;
        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "deleted_todo";
          },
        };
        const actions = {
          deleteTodo: (arg) => {
            spyOnActions.called = true;
            spyOnActions.arg = arg;
          },
        };

        const todoModifiers = makeTodoModifiers(store, actions);
        const expected = "deleted_todo";
        const actual = todoModifiers.deleteTodo(id);

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
        assert.equal(spyOnActions.arg, 1);
      });
    });

    describe("makeVisibilityChanger", () => {
      it("returns an object with changeVisibility", () => {
        const store = {};
        const actions = {};
        const visibilityChanger = makeVisibilityChanger(store, actions);

        assert.equal(
          visibilityChanger.hasOwnProperty("changeVisibility"),
          true
        );
      });

      it("changeVisibility dispatches a set visibility action through the store", () => {
        const spyOnDispatch = { called: false };
        const spyOnActions = { called: false, arg: "" };
        const filter = "ALL";
        const store = {
          dispatch: (action) => {
            spyOnDispatch.called = true;
            return "changed_visibility";
          },
        };
        const actions = {
          setVisibility: (arg) => {
            spyOnActions.called = true;
            spyOnActions.arg = arg;
          },
        };
        const visibilityChanger = makeVisibilityChanger(store, actions);
        const expected = "changed_visibility";
        const actual = visibilityChanger.changeVisibility(filter);

        assert.equal(actual, expected);
        assert.equal(spyOnDispatch.called, true);
        assert.equal(spyOnActions.called, true);
        assert.equal(spyOnActions.arg, "ALL");
      });
    });

    describe("getStoreMethods", () => {
      it("returns an object with store methods", () => {
        const store = {};
        const actions = {};
        const storeMethods = getStoreMethods(store, actions);

        assert.equal(storeMethods.hasOwnProperty("undo"), true);
        assert.equal(storeMethods.hasOwnProperty("redo"), true);
        assert.equal(storeMethods.hasOwnProperty("addTodo"), true);
        assert.equal(storeMethods.hasOwnProperty("toggleTodo"), true);
        assert.equal(storeMethods.hasOwnProperty("deleteTodo"), true);
        assert.equal(storeMethods.hasOwnProperty("changeVisibility"), true);
      });
    });

    describe("getTodos", () => {
      it("returns present todos", () => {
        const store = {
          getState() {
            return {
              todos: {
                past: [],
                present: [{ text: "todo" }],
                future: [],
              },
            };
          },
        };

        const expected = [{ text: "todo" }];
        const actual = getTodos(store);

        assert.deepEqual(actual, expected);
      });
    });

    describe("hasPastTodos", () => {
      it("returns true if past  todos", () => {
        const store = {
          getState() {
            return {
              todos: {
                past: [{ text: "todo" }],
                present: [],
                future: [],
              },
            };
          },
        };

        const expected = true;
        const actual = hasPastTodos(store);

        assert.deepEqual(actual, expected);
      });
      it("returns false if no past todos", () => {
        const store = {
          getState() {
            return {
              todos: {
                past: [],
                present: [],
                future: [],
              },
            };
          },
        };

        const expected = false;
        const actual = hasPastTodos(store);

        assert.deepEqual(actual, expected);
      });
    });

    describe("hasFutureTodos", () => {
      it("returns true if future todos", () => {
        const store = {
          getState() {
            return {
              todos: {
                past: [],
                present: [],
                future: [{ text: "todo" }],
              },
            };
          },
        };

        const expected = true;
        const actual = hasFutureTodos(store);

        assert.deepEqual(actual, expected);
      });
      it("returns false if no future todos", () => {
        const store = {
          getState() {
            return {
              todos: {
                past: [],
                present: [],
                future: [],
              },
            };
          },
        };

        const expected = false;
        const actual = hasFutureTodos(store);

        assert.deepEqual(actual, expected);
      });
    });

    describe("hasTodos", () => {
      it("returns true if there are todos", () => {
        const todos = [1, 2, 3];

        const expected = true;
        const actual = hasTodos(todos);

        assert.deepEqual(actual, expected);
      });
      it("returns false if no todos", () => {
        const todos = [];

        const expected = false;
        const actual = hasTodos(todos);

        assert.deepEqual(actual, expected);
      });
    });

    describe("getVisibility", () => {
      it("returns the visibility filter", () => {
        const store = {
          getState() {
            return {
              visibility: "ALL",
            };
          },
        };

        const expected = "ALL";
        const actual = getVisibility(store);

        assert.deepEqual(actual, expected);
      });
    });

    describe("filterAll", () => {
      it("returns all todos", () => {
        const todo = { done: true };
        const expected = { done: true };
        const actual = filterAll(todo);

        assert.deepEqual(actual, expected);
      });
    });

    describe("filterDone", () => {
      it("returns status of done", () => {
        const todo = { done: false };
        const expected = false;
        const actual = filterDone(todo);

        assert.equal(actual, expected);
      });
    });

    describe("filterInProgress", () => {
      it("returns status of not done", () => {
        const todo = { done: false };
        const expected = true;
        const actual = filterInProgress(todo);

        assert.equal(actual, expected);
      });
    });

    describe("filterTodos", () => {
      it("returns all todos by default", () => {
        const todos = [{ done: false }];
        const expected = [{ done: false }];
        const actual = filterTodos("", todos);

        assert.deepEqual(actual, expected);
      });
      it("returns all todos if specified", () => {
        const todos = [{ done: false }];
        const expected = [{ done: false }];
        const actual = filterTodos("ALL", todos);

        assert.deepEqual(actual, expected);
      });
      it("returns done todos", () => {
        const todos = [{ done: false }];
        const expected = [];
        const actual = filterTodos("DONE", todos);

        assert.deepEqual(actual, expected);
      });
      it("returns todos in progress", () => {
        const todos = [{ done: false }];
        const expected = [{ done: false }];
        const actual = filterTodos("IN_PROGRESS", todos);

        assert.deepEqual(actual, expected);
      });
    });
  });
});
