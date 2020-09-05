import { makeStateHandlers } from "../src/redux/store/state.js";
import { makeDispatcher } from "../src/redux/store/dispatch.js";
import { makeSubscriber } from "../src/redux/store/subscribe.js";

import assert from "assert";

describe("store", () => {
  describe("state.js", () => {
    describe("makeStateHandlers", () => {
      it("generates two functions from a state container input", () => {
        const stateContainer = [{ state: "state" }];
        const stateHandlers = makeStateHandlers(stateContainer);

        assert.equal(stateHandlers.hasOwnProperty("getState"), true);
        assert.equal(stateHandlers.hasOwnProperty("setState"), true);
      });

      it("getState should return the last state", () => {
        const stateContainer = [{ state: "state" }];
        const stateHandlers = makeStateHandlers(stateContainer);

        const expected = { state: "state" };
        const actual = stateHandlers.getState();

        assert.deepEqual(actual, expected);
      });

      it("setState should return the result of pushing a new item to the container", () => {
        const stateContainer = [{ state: "state" }];
        const newState = { state: "newState" };

        const stateHandlers = makeStateHandlers(stateContainer);

        const expectedContainer = [{ state: "state" }, { state: "newState" }];
        const expectedLength = 2;
        const actualLength = stateHandlers.setState(newState);
        const actualContainer = stateContainer;
        assert.equal(actualLength, expectedLength);

        assert.deepEqual(actualContainer, expectedContainer);
      });
    });

    describe("dispatch.js", () => {
      describe("makeDispatcher", () => {
        it("generates a function from state handlers, a reducer and a callback", () => {
          const stateHandlers = {
            getState() {},
            setState(arg) {},
          };
          const onDispatch = () => {};
          const reducer = () => {};

          const dispatcher = makeDispatcher(stateHandlers, reducer, onDispatch);

          assert.equal(dispatcher.hasOwnProperty("dispatch"), true);
        });

        it("returns the action provided", () => {
          const stateHandlers = {
            getState() {},
            setState(arg) {},
          };
          const onDispatch = () => {};
          const reducer = () => {};
          const action = { type: "FOO", value: "FOO" };

          const { dispatch } = makeDispatcher(
            stateHandlers,
            reducer,
            onDispatch
          );

          const expected = action;
          const actual = dispatch(action);

          assert.equal(actual, expected);
        });

        it("calls setState with the newState", () => {
          const spyOnSetState = { arg: "" };

          const stateHandlers = {
            getState() {
              return { state: "BAR" };
            },
            setState(arg) {
              spyOnSetState.arg = arg;
            },
          };
          const onDispatch = () => {};
          const reducer = (state, action) => action.type + state.state;
          const action = { type: "FOO", value: "FOO" };

          const { dispatch } = makeDispatcher(
            stateHandlers,
            reducer,
            onDispatch
          );
          dispatch(action);

          const expected = "FOOBAR";
          const actual = spyOnSetState.arg;

          assert.equal(actual, expected);
        });

        it("calls onDispatch", () => {
          const spyOnDispatch = { called: false };

          const stateHandlers = {
            getState() {},
            setState(arg) {},
          };
          const onDispatch = () => {
            spyOnDispatch.called = true;
          };
          const reducer = () => {};
          const action = {};

          const { dispatch } = makeDispatcher(
            stateHandlers,
            reducer,
            onDispatch
          );
          dispatch(action);

          const expected = true;
          const actual = spyOnDispatch.called;

          assert.equal(actual, expected);
        });
      });
    });

    describe("subscribe.js", () => {
      describe("makeSubscriber", () => {
        it("generates a function from subscribers", () => {
          const subscribers = [];

          const subscriber = makeSubscriber(subscribers);

          assert.equal(subscriber.hasOwnProperty("subscribe"), true);
        });

        it("calls the subscriber", () => {
          const subscribers = [];
          const spyOnSubscribe = { called: false };

          const { subscribe } = makeSubscriber(subscribers);

          subscribe(() => (spyOnSubscribe.called = true));
          subscribers.forEach((subscription) => subscription());

          const expected = true;
          const actual = spyOnSubscribe.called;

          assert.equal(actual, expected);
        });
      });
    });
  });
});
