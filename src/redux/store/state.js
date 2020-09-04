export const makeStateHandlers = (stateContainer) => ({
  getState() {
    const [lastState] = stateContainer.slice(-1);
    return lastState;
  },
  setState(newState) {
    return stateContainer.push(newState);
  },
});