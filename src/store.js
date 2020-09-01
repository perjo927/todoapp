export const createStore = (initialState = {}, reducer) => {
  // retained by closure
  const stateContainer = [initialState];

  const _getState = (stateContainer) => {
    const [lastState] = stateContainer.slice(-1); // no mutation
    return lastState;
  };

  const createGetState = (stateContainer) => () => _getState(stateContainer);
  const getState = createGetState(stateContainer);

  // TODO: pass in statecontainer
  const _setState = (newState /*, stateContainer*/) => {
    return stateContainer.push(newState); // Impure, pass statecontainer -> [...stateContainer, newState] - but: need to assign that result to stateContainer later (mutable then)
  };

  const _dispatch = (/*state,*/ action) => {
    const state = getState();
    const newState = reducer(state, action); // TODO: external dependency getState
    _setState(newState); // TODO: Impure (side effect), emit event instead and assert that it was called
    return action;
  };

  // TODO: Compose with reducer??
  const createDispatch = (/*state*/) => (action) =>
    _dispatch(/*state,*/ action);
  const dispatch = createDispatch(/*getState()*/); // TODO: only valid once

  // TODO: mixin / Object.create
  return {
    getState,
    dispatch,
    subscribe() {
        // use for re-rendering
        console.log("TODO")
    }
  };
};
