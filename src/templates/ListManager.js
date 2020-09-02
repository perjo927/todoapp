import { html } from "lit-html";

const Filter = ({ filter, active, text, onClick }) => html`
  <button @click=${onClick} disabled=${active}>${text}</button>
`;

const onFilterClick = () => {
  console.log("filter click");
};

export const ListManager = () => html`
  <div>
    <span>Show: </span>
    ${Filter({ filter: "ALL", text: "All", onClick: onFilterClick })}
    ${Filter({ filter: "IN_PROGRESS", text: "Active", onClick: onFilterClick })}
    ${Filter({ filter: "DONE", text: "Completed", onClick: onFilterClick })}
  </div>
`;
