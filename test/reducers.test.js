import { combineReducers } from "../src/redux/reducers/combineReducers.js";
import assert from "assert";

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
});
