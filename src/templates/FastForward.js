import { html } from "lit-html";

export const FastForward = ({ disabled, onClick }) => {
  const className = `fastforward${disabled ? " disabled" : ""}`;
  const onFastForward = disabled ? () => {} : onClick;

  return html`
    <div class=${className} @click=${onFastForward}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="36px"
        height="36px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
      </svg>
    </div>
  `;
};
