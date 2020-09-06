import { html } from "lit-html";
import { Input } from "./Input";
import { TodoList } from "./TodoList";
import { ListManager } from "./ListManager";
import { Undo } from "./Undo";
import { Redo } from "./Redo";
import { getTodoItem } from "../factories/todo/index";
import {
  getStoreMethods,
  getTodos,
  getVisibility,
  filterTodos,
  hasTodos,
  hasPastTodos,
  hasFutureTodos,
} from "../business-logic/index";
import { getAndResetInput, maybeRender } from "../view-logic/index";
import { compose } from "../utils/compose";

export const App = ({ store, actions }) => {
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    changeVisibility,
    undo,
    redo,
  } = getStoreMethods(store, actions);

  const getInputAndAddTodo = compose(addTodo, getTodoItem, getAndResetInput);

  /* Event Handlers */
  const onChangeVisibility = (filter) => changeVisibility(filter);
  const onSubmit = (e) => getInputAndAddTodo(e);

  /* Template dependencies */
  const visibility = getVisibility(store);
  const allTodos = getTodos(store);
  const filteredTodos = filterTodos(visibility, allTodos);
  const hasAnyTodos = hasTodos(allTodos);
  const hasVisibleTodos = hasTodos(filteredTodos);
  const canUndo = hasPastTodos(store);
  const canRedo = hasFutureTodos(store);

  return html`
    <nav>
      ${Undo({ disabled: !canUndo, onClick: undo })}
      ${Redo({ disabled: !canRedo, onClick: redo })}
    </nav>

    <header>
      <h1>Todo</h1>
    </header>

    <main>
      ${Input({ onSubmit })}
      ${maybeRender(
        TodoList({ todos: filteredTodos, toggleTodo, deleteTodo }),
        hasVisibleTodos
      )}
      ${maybeRender(
        ListManager({ selected: visibility, onClick: onChangeVisibility }),
        hasAnyTodos
      )}
    </main>
  `;
};
