export const combineReducers = (reducers) => (
  state = {},
  action = { value: null, type: null }
) =>
  Object.keys(reducers).reduce((nextState, key) => {
    // Call every reducer with the part of the state it manages
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});
