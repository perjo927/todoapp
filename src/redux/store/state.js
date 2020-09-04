export const makeStateHandlers = (stateContainer) => ({
  getState() {
    const [lastState] = stateContainer.slice(-1);
    return lastState;
  },
  setState(newState) {
    return stateContainer.push(newState);
  },
});

export const makeStateTimeTraveller = (stateContainer, onStateChange) => {
  const memoryContainer = [];
  let intervalReference;

  const canGoForward = () => memoryContainer.length > 0;
  const canGoBack = () => stateContainer.length > 1;

  const goBack = () => {
    if (stateContainer.length <= 1) {
      clearInterval(intervalReference);
      return;
    }
    memoryContainer.push(stateContainer.pop());
    onStateChange();
  };

  const goForward = () => {
    if (memoryContainer.length === 0) {
      clearInterval(intervalReference);
      return;
    }
    stateContainer.push(memoryContainer.pop());
    onStateChange();
  };

  const rewind = () => {
    intervalReference = setInterval(goBack, 750);
  };
  const fastForward = () => {
    intervalReference = setInterval(goForward, 750);
  };

  return {
    rewind: {
      execute: rewind,
      canExecute: canGoBack,
    },
    fastForward: {
      execute: fastForward,
      canExecute: canGoForward,
    },
  };
};
