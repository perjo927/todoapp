import { html } from "lit-html";
import { CONSTS } from "../redux/actions/index";

const { ALL, DONE, IN_PROGRESS } = CONSTS.visibilityFilters;

const filterAll = { filter: ALL, text: "All" };
const filterDone = { filter: DONE, text: "Done" };
const filterInProgress = {
  filter: IN_PROGRESS,
  text: "In Progress",
};

const Filter = ({ filter, text, selected, onClick }) => {
  const isFilterSelected = filter === selected;
  const className = isFilterSelected ? "selected" : "";

  return html`
    <a
      @click=${() => !isFilterSelected && onClick(filter)}
      disabled=${isFilterSelected}
      class=${className}
    >
      ${text}
    </a>
  `;
};

export const ListManager = (args) => html`
  <div class="list-manager">
    ${Filter({ ...filterAll, ...args })}
    ${Filter({ ...filterInProgress, ...args })}
    ${Filter({ ...filterDone, ...args })}
  </div>
`;
