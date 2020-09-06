import {
  createTodoBase,
  createTodoItem,
  getTodoItem,
} from "../src/factories/todo/index.js";

import assert from "assert";

describe("factories", () => {
  describe("todo", () => {
    describe("index.js", () => {
      describe("createTodoBase", () => {
        it("returns a basic todo object from a text", () => {
          const text = "text";
          const expected = { text: "text", done: false };
          const actual = createTodoBase(text);

          assert.deepEqual(actual, expected);
        });
      });

      describe("createTodoItem", () => {
        it("returns an extended todo object from a simple todo object and an id object", () => {
          const todo = { text: "text", done: false };
          const id = { id: 1 };
          const expected = { text: "text", done: false, id: 1 };
          const actual = createTodoItem(todo, id);

          assert.deepEqual(actual, expected);
        });
      });

      describe("getTodoItem", () => {
        it("returns an extended todo object from a text", () => {
          const todo = getTodoItem("foo");

          assert.equal(todo.hasOwnProperty("id"), true);
          assert.equal(todo.hasOwnProperty("done"), true);
          assert.equal(todo.hasOwnProperty("text"), true);
        });
      });
    });
  });
});
