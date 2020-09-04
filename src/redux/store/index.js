import { makeSubscriber } from "./subscribe";
import { makeStateGetter, makeStateSetter } from "./state";
import { makeDispatcher } from "./dispatch";

export const createStore = (initialState = {}, reducer) => {
  const stateContainer = [initialState];
  const subscribers = [];
  const stateHandlers = {
    ...makeStateSetter(stateContainer),
    ...makeStateGetter(stateContainer),
  };

  const onDispatch = () => {
    subscribers.forEach((subscription) => subscription());
  };

  const { dispatch } = makeDispatcher(stateHandlers, reducer, onDispatch);
  const { subscribe } = makeSubscriber(subscribers);

  return {
    getState: stateHandlers.getState,
    dispatch,
    subscribe,
  };
};
