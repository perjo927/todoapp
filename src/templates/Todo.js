import { html } from "lit-html";

/*
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
*/
const Todo = ({ onClick, text, done }) => html`
  <li @click=${onClick}>${text}</li>
`;

export const TodoList = ({ todos, toggleTodo }) => html`
  <ul>
    ${todos.map((todo) =>
      Todo({
        onClick: () => toggleTodo(todo.id),
        text: todo.text,
        done: todo.done,
      })
    )}
  </ul>
`;
