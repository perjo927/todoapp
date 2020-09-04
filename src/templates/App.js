import { html } from "lit-html";
import { Input } from "./Input";
import { TodoList } from "./TodoList";
import { ListManager } from "./ListManager";
import { getTodoItem } from "../factories/todo/index";
import {
  getStoreMethods,
  getTodos,
  getVisibility,
  filterTodos,
  hasTodos,
} from "../business-logic/index";
import { getAndResetInput, maybeRender } from "../view-logic/index";

export const App = ({ store, actions }) => {
  const { addTodo, toggleTodo, deleteTodo, changeVisibility } = getStoreMethods(
    store,
    actions
  );

  /* Event Handlers */
  const onChangeVisibility = (filter) => changeVisibility(filter);

  const onSubmit = (e) => {
    // TODO: Compose
    const value = getAndResetInput(e);
    const newTodoItem = getTodoItem(value);
    addTodo(newTodoItem);
  };

  /* Template logic */
  const visibility = getVisibility(store);
  const allTodos = getTodos(store);
  const hasAnyTodos = hasTodos(allTodos);
  const filteredTodos = filterTodos(visibility, allTodos);
  const hasVisibleTodos = hasTodos(filteredTodos);

  return html`
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
