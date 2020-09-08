import css from "./main.css";
import { createStore } from "./redux/store/index";
import { actions } from "./redux/actions/index";
import { rootReducer } from "./redux/reducers/index";
import { render } from "lit-html";
import { App } from "./templates/App";

const store = createStore(rootReducer, {});

export default () => {
  // Initial render
  render(App({ store, actions }), document.body);

  // Subsequent renders
  store.subscribe(() => render(App({ store, actions }), document.body));
};
