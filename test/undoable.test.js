import {
  undo,
  redo,
  defaultReduce,
  getUndoableReducer,
} from "../src/redux/reducers/undoable.js";
import { CONSTS } from "../src/redux/actions/index.js";
import assert from "assert";

const {
  actions: { UNDO, REDO },
} = CONSTS;

describe("reducers", () => {
  describe("undoable.js", () => {
    describe("undo", () => {
      it("returns a new past, a previous present and a present in the future", () => {
        const past = [1, 2, 3];
        const present = 4;
        const future = [];

        const expected = { past: [1, 2], present: 3, future: [4] };
        const actual = undo({ past, present, future });

        assert.deepEqual(actual, expected);
      });
    });

    describe("redo", () => {
      it("returns a new past with the present, a new present from the future and a sliced future", () => {
        const past = [1, 2, 3];
        const present = 4;
        const future = [5, 6];

        const expected = { past: [1, 2, 3, 4], present: 5, future: [6] };
        const actual = redo({ past, present, future });

        assert.deepEqual(actual, expected);
      });
    });

    describe("defaultReducer", () => {
      it("returns the same state if new present state is equal to old", () => {
        const past = [1, 2, 3];
        const present = 4;
        const future = [5, 6];
        const state = { past, present, future };
        const action = 100;
        const areEqual = (oldPresentState, newPresentState) =>
          oldPresentState === newPresentState;
        const reducer = (presentState, action) => presentState;

        const expected = { past: [1, 2, 3], present: 4, future: [5, 6] };
        const actual = defaultReduce(state, reducer, action, areEqual);

        assert.deepEqual(actual, expected);
      });

      it("returns a new present, future and past state if new present is different than the old", () => {
        const past = [1, 2, 3];
        const present = 4;
        const future = [5, 6];
        const state = { past, present, future };
        const action = 100;
        const areEqual = (oldPresentState, newPresentState) =>
          oldPresentState === newPresentState;
        const reducer = (presentState, action) => presentState + action;

        const expected = { past: [1, 2, 3, 4], present: 104, future: [] };
        const actual = defaultReduce(state, reducer, action, areEqual);

        assert.deepEqual(actual, expected);
      });
    });

    describe("getUndoableReducer", () => {
      it("returns an inital state with past, present and future", () => {
        const areEqual = () => true;
        const reducer = (state, action) => state;
        const expected = {
          past: [],
          present: undefined,
          future: [],
        };
        const undoable = getUndoableReducer(reducer, areEqual);
        const actual = undoable();
        assert.deepEqual(actual, expected);
      });

      it("can default reduce", () => {
        const areEqual = () => false;
        const reducer = (state, action) => 1337;
        const state = {
          past: [],
          present: 42,
          future: [],
        };
        const action = {};

        const expected = {
          past: [42],
          present: 1337,
          future: [],
        };
        const undoable = getUndoableReducer(reducer, areEqual);
        const actual = undoable(state, action);
        assert.deepEqual(actual, expected);
      });

      it("can undo", () => {
        const areEqual = () => false;
        const reducer = (state, action) => 1337;
        const state = {
          past: [],
          present: 42,
          future: [],
        };
        const action = {};
        const actionUndo = { type: UNDO };

        const undoable = getUndoableReducer(reducer, areEqual);
        const newState = undoable(state, action);
        const actual = undoable(newState, actionUndo);
        const expected = {
          past: [],
          present: 42,
          future: [1337],
        };

        assert.deepEqual(actual, expected);
      });

      it("can redo", () => {
        const areEqual = () => false;
        const reducer = (state, action) => 1337;
        const state = {
          past: [],
          present: 42,
          future: [],
        };
        const action = {};
        const actionUndo = { type: UNDO };
        const actionRedo = { type: REDO };

        const undoable = getUndoableReducer(reducer, areEqual);
        const newState = undoable(state, action);
        const unDidState = undoable(newState, actionUndo);

        const expected = {
          past: [42],
          present: 1337,
          future: [],
        };
        const actual = undoable(unDidState, actionRedo);

        assert.deepEqual(actual, expected);
      });
    });
  });
});
