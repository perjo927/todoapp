import { html } from "lit-html";

const Todo = ({ onToggleClick, onDeleteClick, text, done }) => {
  const textClass = "todo text" + (done ? " done" : "");
  const check = done ? "✔" : "";
  return html`
    <li>
      <div class="todo toggle" @click=${onToggleClick}>${check}</div>
      <div class=${textClass}>${text}</div>
      <div class="todo delete" @click=${onDeleteClick}>X</div>
    </li>
  `;
};

export const TodoList = ({ todos, toggleTodo, deleteTodo }) => html`
  <ul>
    ${todos.map((todo) =>
      Todo({
        onToggleClick: () => toggleTodo(todo.id),
        onDeleteClick: () => deleteTodo(todo.id),
        text: todo.text,
        done: todo.done,
      })
    )}
  </ul>
`;
