export const makeDispatcher = (stateHandlers, reducer, onDispatch) => ({
  dispatch(action) {
    const { getState, setState } = stateHandlers;

    const state = getState();
    const newState = reducer(state, action);
    setState(newState);

    onDispatch();

    return action;
  },
});
