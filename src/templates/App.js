import { html } from "lit-html";
import { Input } from "./Input";
import { TodoList } from "./Todo";
import { ListManager } from "./ListManager";
import { getTodoItem } from "../factories/todo/index";

export const App = ({ store, actions }) => {
  const onSubmit = (e) => {
    const [input] = e.target;
    const { value } = input;
    input.value = "";
    const newTodoItem = getTodoItem(value);
    store.dispatch(actions.addTodo(newTodoItem));
  };

  const getTodos = () => {
    const { todos } = store.getState();
    return todos?.present || [];
  };

  const toggleTodo = (id) => store.dispatch(actions.toggleTodo(id));

  const todos = getTodos();

  return html` <h1>Todo App</h1>
    <div>
      ${Input({
        onSubmit,
      })}
      ${TodoList({ todos, toggleTodo })} ${ListManager()}
    </div>`;
};
