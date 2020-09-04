export const makeStateGetter = (stateContainer) => ({
  getState() {
    const [lastState] = stateContainer.slice(-1);
    return lastState;
  },
});

export const makeStateSetter = (stateContainer) => ({
  setState(newState) {
    return stateContainer.push(newState);
  },
});
