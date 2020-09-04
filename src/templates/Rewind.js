import { html } from "lit-html";

export const Rewind = ({ disabled, onClick }) => {
  const className = `${disabled ? "disabled" : ""}`;
  const onRewind = disabled ? () => {} : onClick;

  return html`
    <div class=${className} @click=${onRewind}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="36px"
        height="36px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
      </svg>
    </div>
  `;
};
