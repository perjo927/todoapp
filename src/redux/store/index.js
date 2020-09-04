import { makeSubscriber } from "./subscribe";
import { makeStateHandlers } from "./state";
import { makeDispatcher } from "./dispatch";

export const createStore = (initialState = {}, reducer) => {
  const stateContainer = [initialState];
  const subscribers = [];
  const stateHandlers = {
    ...makeStateHandlers(stateContainer),
  };

  const onStateChange = () => {
    subscribers.forEach((subscription) => subscription());
  };

  const { dispatch } = makeDispatcher(stateHandlers, reducer, onStateChange);
  const { subscribe } = makeSubscriber(subscribers);

  return {
    getState: stateHandlers.getState,
    dispatch,
    subscribe,
  };
};
