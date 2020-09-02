import { html } from "lit-html";

export const Input = ({ onSubmit }) => {
  return html`
    <div>
      <form
        @submit=${(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <input />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  `;
};
