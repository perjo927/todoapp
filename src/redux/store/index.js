export const createStore = (initialState = {}, reducer) => {
  const stateContainer = [initialState];
  const subscribers = [];

  const _getState = (stateContainer) => {
    const [lastState] = stateContainer.slice(-1);
    return lastState;
  };
  const createGetState = (stateContainer) => () => _getState(stateContainer);
  const getState = createGetState(stateContainer);

  const setState = (newState) => {
    // subs
    return stateContainer.push(newState);
  };

  const dispatch = (action) => {
    const state = getState();
    const newState = reducer(state, action);
    setState(newState);
    subscribers.forEach((subscriber) => subscriber());
    return action;
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
