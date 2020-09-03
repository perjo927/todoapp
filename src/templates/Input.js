import { html } from "lit-html";

export const Input = ({ onSubmit }) => {
  return html`
    <form
      @submit=${(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <input placeholder="What needs to be done?" autofocus="" />
    </form>
  `;
};
