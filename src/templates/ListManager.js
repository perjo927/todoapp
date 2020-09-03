import { html } from "lit-html";

const onClick = () => {
  console.log("filter click");
};

const filterAll = { filter: "ALL", text: "All", onClick };
const filterInProgress = {
  filter: "IN_PROGRESS",
  text: "In Progress",
  onClick,
};
const filterDone = { filter: "DONE", text: "Done", onClick };

export const VisibleFilter = ({ onClick }) => {
  return html` ${Filter()} `;
};

const Filter = ({ filter, selected, text, onClick }) => html`
  <button @click=${onClick} disabled=${selected}>${text}</button>
`;

export const ListManager = () => html`
  <div>
    <span>Show: </span>
    ${Filter(filterAll)} ${Filter(filterInProgress)} ${Filter(filterDone)}
  </div>
`;
