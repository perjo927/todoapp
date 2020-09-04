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

// TODO: Pass context object?
export const App = ({ store, actions }) => {
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    changeVisibility,
    undo,
    redo,
  } = getStoreMethods(store, actions);

  /* Event Handlers */
  const onChangeVisibility = (filter) => changeVisibility(filter);

  const onSubmit = (e) => {
    // TODO: Compose
    const value = getAndResetInput(e);
    if (value !== "") {
      const newTodoItem = getTodoItem(value);
      addTodo(newTodoItem);
    }
  };

  const onUndo = () => undo();
  const onRedo = () => redo();

  /* Template dependencies */
  const visibility = getVisibility(store);
  const allTodos = getTodos(store);
  const hasAnyTodos = hasTodos(allTodos);
  const filteredTodos = filterTodos(visibility, allTodos);
  const hasVisibleTodos = hasTodos(filteredTodos);
  const canUndo = hasPastTodos(store);
  const canRedo = hasFutureTodos(store);

  return html`
    <nav>
      ${Undo({ disabled: !canUndo, onClick: onUndo })}
      ${Redo({ disabled: !canRedo, onClick: onRedo })}
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
