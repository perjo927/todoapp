import { compose } from "../src/utils/compose.js";
import assert from "assert";

describe("utils", () => {
  describe("compose.js", () => {
    describe("compose", () => {
      it("returns a composed function h, so that h(x) is equal to f(g(x))", () => {
        const x = 300;
        const f = (x) => x + 1000;
        const g = (x) => x + 37;
        const h = compose(f, g);

        const resultAfterG = g(x);
        const resultAfterF = f(resultAfterG);

        const actual = h(x);
        const expected = 1337;
        assert.equal(actual, expected);
        assert.equal(actual, resultAfterF);
      });
    });
  });
});
