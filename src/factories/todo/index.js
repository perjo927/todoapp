import { generateId } from "../id/index.js";

export const createTodoBase = (text) => ({ text, done: false });

export const createTodoItem = (todoObj, idObj) => ({
  ...todoObj,
  ...idObj,
});

export const getTodoItem = (text) => {
  const idObj = generateId();
  const todoObj = createTodoBase(text);
  return createTodoItem(todoObj, idObj);
};
