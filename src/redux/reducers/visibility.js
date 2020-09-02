import { CONSTS } from "../actions";

const {
  actions: { SET_VISIBILITY },
  visibilityFilters: { ALL },
} = CONSTS;

export const setVisibility = (state, filter) => filter;

export const visibilityReducer = (state = ALL, action) =>
  action.type === SET_VISIBILITY ? setVisibility(state, action.value) : state;
