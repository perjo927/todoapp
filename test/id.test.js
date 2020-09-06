import { generateId } from "../src/factories/id/index.js";
import assert from "assert";

describe("factories", () => {
  describe("id", () => {
    describe("index.js", () => {
      describe("generateId", () => {
        it("returns an id object", () => {
          const id = generateId();
          assert.equal(id.hasOwnProperty("id"), true);
        });
      });
    });
  });
});
