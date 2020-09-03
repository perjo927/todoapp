import { html } from "lit-html";
import { CONSTS } from "../redux/actions/index";

const { ALL, DONE, IN_PROGRESS } = CONSTS.visibilityFilters;

const filterAll = { filter: ALL, text: "All" };
const filterInProgress = {
  filter: IN_PROGRESS,
  text: "In Progress",
};
const filterDone = { filter: DONE, text: "Done" };

const Filter = ({ filter, selected, text, onClick }) => {
  const className = filter === selected ? "selected" : "";
  return html`
    <a
      @click=${() => {
        filter !== selected && onClick(filter);
      }}
      disabled=${filter === selected}
      class=${className}
    >
      ${text}
    </a>
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
