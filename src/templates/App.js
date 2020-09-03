import { html } from "lit-html";
import { Input } from "./Input";
import { TodoList } from "./Todo";
import { ListManager } from "./ListManager";
import { getTodoItem } from "../factories/todo/index";
import { CONSTS } from "../redux/actions/index";
const { ALL, DONE, IN_PROGRESS } = CONSTS.visibilityFilters;

export const App = ({ store, actions }) => {
  const getTodos = () => {
    const { todos } = store.getState();
    return todos?.present || [];
  };

  const getVisibility = () => {
    const { visibility } = store.getState();
    return visibility;
  };

  const onChangeVisibility = (filter) => changeVisibility(filter);

  const addTodo = (todo) => store.dispatch(actions.addTodo(todo));
  const toggleTodo = (id) => store.dispatch(actions.toggleTodo(id));
  const deleteTodo = (id) => store.dispatch(actions.deleteTodo(id));
  const changeVisibility = (filter) =>
    store.dispatch(actions.setVisibility(filter));

  const onSubmit = (e) => {
    const [input] = e.target;
    const { value } = input;
    input.value = "";
    const newTodoItem = getTodoItem(value);
    addTodo(newTodoItem);
  };

  const filterAll = (todo) => todo;
  const filterDone = (todo) => todo.done;
  const filterInProgress = (todo) => !todo.done;
  const filterFunctionMap = new Map([
    [ALL, filterAll],
    [DONE, filterDone],
    [IN_PROGRESS, filterInProgress],
  ]);

  const visibility = getVisibility();

  const filterTodos = (visibility, todos) => {
    const filterFunction = filterFunctionMap.get(visibility) || filterAll;
    return todos.filter(filterFunction);
  };

  const unfilteredTodos = getTodos();
  const todos = filterTodos(visibility, unfilteredTodos);

  const hasVisibleTodos = todos.length > 0;
  const hasTodos = unfilteredTodos.length > 0;

  const maybeRenderTodoList = (Template) => (hasVisibleTodos ? Template : null);
  const maybeRenderListManager = (Template) => (hasTodos ? Template : null);

  return html` <header>
      <h1>Todo</h1>
    </header>
    <main>
      ${Input({
        onSubmit,
      })}
      ${maybeRenderTodoList(TodoList({ todos, toggleTodo, deleteTodo }))}
      ${maybeRenderListManager(ListManager({ visibility, onChangeVisibility }))}
    </main>`;
};
