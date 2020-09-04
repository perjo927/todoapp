import css from "./main.css";
import { createStore } from "./redux/store/index";
import { actions } from "./redux/actions/index";
import { rootReducer } from "./redux/reducers/index";
import { render } from "lit-html";
import { App } from "./templates/App";

const store = createStore({}, rootReducer);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(actions.toggleTodo(id));
// store.dispatch(actions.toggleTodo(id));
// store.dispatch(actions.undo());
// store.dispatch(actions.redo());
// store.dispatch(actions.deleteTodo(id));
// store.dispatch(actions.setVisibility("ALL")); // TODO: name filter

export default () => {
  // Initial render
  render(App({ store, actions }), document.body);
  
  // Subsequent renders
  store.subscribe(() => render(App({ store, actions }), document.body));
};
