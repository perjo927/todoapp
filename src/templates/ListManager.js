import { html } from "lit-html";

const filterAll = { filter: "ALL", text: "All" };
const filterInProgress = {
  filter: "IN_PROGRESS",
  text: "In Progress",
};
const filterDone = { filter: "DONE", text: "Done" };

export const VisibleFilter = ({ onClick }) => {
  return html` ${Filter()} `;
};

const Filter = ({ filter, selected, text, onClick }) => {
  const className = filter === selected? "selected" : "";
  return html`
    <button
      @click=${onClick}
      disabled=${filter === selected}
      class=${className}
    >
      ${text}
    </button>
  `;
};

export const ListManager = ({
  visibility: selected,
  onChangeVisibility: onClick,
}) => html`
  <div class="list-manager">
    ${Filter({ ...filterAll, selected, onClick })}
    ${Filter({ ...filterInProgress, selected, onClick })}
    ${Filter({ ...filterDone, selected, onClick })}
  </div>
`;
