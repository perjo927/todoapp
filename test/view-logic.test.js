import { getAndResetInput, maybeRender } from "../src/view-logic/index.js";
import assert from "assert";

describe("view-logic", () => {
  describe("index.js", () => {
    describe("getAndResetInput", () => {
      it("returns the target value", () => {
        const event = { target: [{ value: 1337 }] };
        const expected = 1337;
        const actual = getAndResetInput(event);
        assert.equal(actual, expected);
      });

      it("resets the target input", () => {
        const event = { target: [{ value: 1337 }] };
        const expected = "";
        getAndResetInput(event);
        const actual = event.target[0].value;
        assert.equal(actual, expected);
      });

      describe("maybeRender", () => {
        it("returns template if validated", () => {
          const validator = true;
          const template = "html";

          const expected = "html";
          const actual = maybeRender(template, validator);

          assert.equal(actual, expected);
        });
        it("returns null if not validated", () => {
          const validator = false;
          const template = "html";

          const expected = null;
          const actual = maybeRender(template, validator);

          assert.equal(actual, expected);
        });
      });
    });
  });
});
