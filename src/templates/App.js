import { html } from "lit-html";
import { Input } from "./Input";
import { TodoList } from "./Todo";
import { ListManager } from "./ListManager";
import { getTodoItem } from "../factories/todo/index";

export const App = ({ store, actions }) => {
  const getTodos = () => {
    const { todos } = store.getState();
    return todos?.present || [];
  };

  const getVisibility = () => {
    const { visibility } = store.getState();
    return visibility;
  };

  const onChangeVisibility = (e) => {
    console.log("clicked", e);
  };

  const addTodo = (todo) => store.dispatch(actions.addTodo(todo));
  const toggleTodo = (id) => store.dispatch(actions.toggleTodo(id));
  const deleteTodo = (id) => store.dispatch(actions.deleteTodo(id));

  const onSubmit = (e) => {
    const [input] = e.target;
    const { value } = input;
    input.value = "";
    const newTodoItem = getTodoItem(value);
    addTodo(newTodoItem);
  };

  const todos = getTodos();
  const hasTodos = todos.length > 0;

  const visibility = getVisibility();

  const maybeRender = (Template) => (hasTodos ? Template : null);

  return html` <header>
      <h1>Todo</h1>
    </header>
    <main>
      ${Input({
        onSubmit,
      })}
      ${maybeRender(TodoList({ todos, toggleTodo, deleteTodo }))}
      ${maybeRender(ListManager({ visibility, onChangeVisibility }))}
    </main>`;
};
