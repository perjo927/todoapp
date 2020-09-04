import { html } from "lit-html";

const Todo = ({ onToggleClick, onDeleteClick, text, done }) => {
  const toggleClass = "todo toggle";
  const deleteClass = "todo delete";
  const textClass = `todo text ${done ? " done" : ""}`;
  const checkMark = done ? "✔" : "";

  return html`
    <li>
      <div class=${toggleClass} @click=${onToggleClick}>${checkMark}</div>
      <div class=${textClass}>${text}</div>
      <div class=${deleteClass} @click=${onDeleteClick}>X</div>
    </li>
  `;
};

export const TodoList = ({ todos, toggleTodo, deleteTodo }) => html`
  <ul>
    ${todos.map(({ id, text, done }) =>
      Todo({
        onToggleClick: () => toggleTodo(id),
        onDeleteClick: () => deleteTodo(id),
        text,
        done,
      })
    )}
  </ul>
`;
