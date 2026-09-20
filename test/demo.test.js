"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { formatVariableSentence, getLoopStep, popStack, pushStack } = require("../script.js");
const root = path.join(__dirname, "..");

test("variable demo formats names and singular/plural points", () => {
  assert.equal(formatVariableSentence("Ada", 1), "Ada has 1 point.");
  assert.equal(formatVariableSentence("  ", 3), "Learner has 3 points.");
});

test("loop demo advances through each robot and completes", () => {
  assert.deepEqual(getLoopStep(-1), {
    activeIndex: -1,
    message: "Press “Next step” to begin.",
    complete: false
  });
  assert.equal(getLoopStep(1).message, "Step 2: Boop waves hello.");
  assert.equal(getLoopStep(3).complete, true);
});

test("stack demo follows last-in, first-out behavior and respects its limit", () => {
  const pushed = pushStack(["A"], "B");
  assert.deepEqual(pushed.stack, ["A", "B"]);
  assert.deepEqual(popStack(pushed.stack).stack, ["A"]);
  assert.deepEqual(pushStack(["A", "B", "C", "D"], "E").stack, ["A", "B", "C", "D"]);
  assert.match(pushStack([], "  ").message, /Type a label/);
});

test("page references local assets and includes key accessible landmarks", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /<main id="main">/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /href="#main">Skip to main content/);
  assert.match(html, /href="\/public\/learn\/">Start learning/);
  assert.match(html, /src="script\.js"/);
  assert.match(html, /href="styles\.css"/);
  assert.equal(fs.existsSync(path.join(root, "script.js")), true);
  assert.equal(fs.existsSync(path.join(root, "styles.css")), true);
});
