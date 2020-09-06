export const compose = (...functions) => (argToComposedFunction) =>
  functions.reduceRight(
    (accumulatedValue, func) => func(accumulatedValue),
    argToComposedFunction
  );
