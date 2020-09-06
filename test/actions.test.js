import { actions } from "../src/redux/actions/index.js";

import assert from "assert";

describe("actions.js", () => {
  describe("index", () => {
    describe("actions", () => {
      it("returns add todo action", () => {
        const todo = {};
        const expected = { type: "ADD", value: {} };
        const actual = actions.addTodo(todo);

        assert.deepEqual(actual, expected);
      });

      it("returns delete todo action", () => {
        const todoId = 1;
        const expected = { type: "DELETE", value: 1 };
        const actual = actions.deleteTodo(todoId);

        assert.deepEqual(actual, expected);
      });

      it("returns toggle todo action", () => {
        const todoId = 1;
        const expected = { type: "TOGGLE", value: 1 };
        const actual = actions.toggleTodo(todoId);

        assert.deepEqual(actual, expected);
      });

      it("returns undo action", () => {
        const expected = { type: "UNDO", value: null };
        const actual = actions.undo();
        assert.deepEqual(actual, expected);
      });

      it("returns redo action", () => {
        const expected = { type: "REDO", value: null };
        const actual = actions.redo();
        assert.deepEqual(actual, expected);
      });

      it("returns set visibility action", () => {
        const expected = { type: "SET_VISIBILITY", value: "ALL" };
        const actual = actions.setVisibility("ALL");
        assert.deepEqual(actual, expected);
      });
    });
  });
});
