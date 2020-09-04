export const getAndResetInput = (e) => {
  const [input] = e.target;
  const { value } = input;
  input.value = "";
  return value;
};

export const maybeRender = (Template, validator) =>
  validator ? Template : null;
