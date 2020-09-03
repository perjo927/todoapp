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

  return html` <header>
      <h1>Todo</h1>
    </header>
    <main>
      ${Input({
        onSubmit,
      })}
      ${TodoList({ todos, toggleTodo, deleteTodo })} ${ListManager()}
    </main>`;
};
