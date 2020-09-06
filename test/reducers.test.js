import { combineReducers } from "../src/redux/reducers/combineReducers.js";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  areTodosEqual,
  todoReducer,
} from "../src/redux/reducers/todos.js";
import { CONSTS } from "../src/redux/actions/index.js";
import assert from "assert";

const {
  actions: { ADD, DELETE, TOGGLE },
} = CONSTS;

describe("reducers", () => {
  describe("combineReducers.js", () => {
    describe("combineReducers", () => {
      it("calls the reducers with the state and the action and generates a new state", () => {
        const reducer1 = (state, action) =>
          action.type === "FOO" ? state + action.value : state;
        const reducer2 = (state, action) =>
          action.type === "BAR" ? state - action.value : state;

        const state = { foo: 1, bar: 1 };
        const action1 = { type: "FOO", value: 1 };
        const action2 = { type: "BAR", value: 1 };

        const combinedReducer = combineReducers({
          foo: reducer1,
          bar: reducer2,
        });

        const expected1 = { foo: 2, bar: 1 };
        const expected2 = { foo: 1, bar: 0 };

        const actual1 = combinedReducer(state, action1);
        const actual2 = combinedReducer(state, action2);

        assert.deepEqual(actual1, expected1);
        assert.deepEqual(actual2, expected2);
      });
    });
  });

  describe("todos.js", () => {
    describe("addTodo", () => {
      it("adds a new todo to a new state", () => {
        const state = [];
        const newTodo = { text: "text" };

        const expected = [{ text: "text" }];
        const actual = addTodo(state, newTodo);

        assert.deepEqual(actual, expected);
      });
    });

    describe("deleteTodo", () => {
      it("deletes a todo and creates a new state", () => {
        const state = [{ text: "text", id: 1 }];

        const expected = [];
        const actual = deleteTodo(state, 1);

        assert.deepEqual(actual, expected);
      });
    });

    describe("toggleTodo", () => {
      it("toggles a todo and creates a new state", () => {
        const state = [{ text: "text", id: 1, done: false }];

        const expected = [{ text: "text", id: 1, done: true }];
        const actual = toggleTodo(state, 1);

        assert.deepEqual(actual, expected);
      });
    });

    describe("areTodosEqual", () => {
      it("validates equal todos when lists are of the same length", () => {
        const oldTodoList = [{ text: "text", id: 1, done: false }];
        const newEqualTodoList = [{ text: "text", id: 1, done: false }];

        const expected = true;
        const actual = areTodosEqual(oldTodoList, newEqualTodoList);

        assert.equal(actual, expected);
      });

      it("validates unequal todos when lists are of the same length", () => {
        const oldTodoList = [{ text: "text", id: 1, done: false }];
        const newEqualTodoList = [{ text: "text", id: 1, done: true }];

        const expected = false;
        const actual = areTodosEqual(oldTodoList, newEqualTodoList);

        assert.equal(actual, expected);
      });

      it("validates unequal todos when lists are of different length", () => {
        const oldTodoList = [{ text: "text" }, { text: "text" }];
        const newEqualTodoList = [{ text: "text" }];

        const expected = false;
        const actual = areTodosEqual(oldTodoList, newEqualTodoList);

        assert.equal(actual, expected);
      });
    });

    describe("todoReducer", () => {
      it("adds a todo given the right action", () => {
        const state = [];
        const action = { type: ADD, value: { text: "text" } };

        const expected = [{ text: "text" }];
        const actual = todoReducer(state, action);

        assert.deepEqual(actual, expected);
      });

      it("deletes a todo given the right action", () => {
        const state = [{ text: "text", id: 1 }];
        const action = { type: DELETE, value: 1 };

        const expected = [];
        const actual = todoReducer(state, action);

        assert.deepEqual(actual, expected);
      });

      it("toggles a todo given the right action", () => {
        const state = [{ text: "text", id: 1, done: true }];
        const action = { type: TOGGLE, value: 1 };

        const expected = [{ text: "text", id: 1, done: false }];
        const actual = todoReducer(state, action);

        assert.deepEqual(actual, expected);
      });

      it("returns the state by default when type is unknown", () => {
        const state = [];
        const action = { type: "FOOBAR" };

        const expected = [];
        const actual = todoReducer(state, action);

        assert.deepEqual(actual, expected);
      });
    });
  });
});
