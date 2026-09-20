"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { formatVariableSentence, getLoopStep, popStack, pushStack } = require("../showcase/script.js");
const root = path.join(__dirname, "..");
const showcase = path.join(root, "showcase");

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
  const html = fs.readFileSync(path.join(showcase, "index.html"), "utf8");
  assert.match(html, /<main id="main">/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /href="#main">Skip to main content/);
  assert.match(html, /href="\/public\/">Start learning/);
  assert.match(html, /src="script\.js"/);
  assert.match(html, /href="styles\.css"/);
  assert.equal(fs.existsSync(path.join(showcase, "script.js")), true);
  assert.equal(fs.existsSync(path.join(showcase, "styles.css")), true);
});

test("learning platform assets resolve from the Pages root", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const assetReferences = [...html.matchAll(/(?:src|href)="(\/public\/assets\/[^"]+)"/g)]
    .map((match) => match[1]);

  assert.ok(assetReferences.length > 0);
  for (const reference of assetReferences) {
    assert.equal(
      fs.existsSync(path.join(root, reference.replace(/^\/public\//, ""))),
      true,
      `Missing root asset for ${reference}`
    );
  }
  assert.ok(html.includes("/public/cs-geni-logo.png") || fs.existsSync(path.join(root, "cs-geni-logo.png")));
});

test("deployment excludes source maps and the retired learn directory", () => {
  const assetFiles = fs.readdirSync(path.join(root, "assets"), { recursive: true });

  assert.equal(assetFiles.some((file) => String(file).endsWith(".map")), false);
  assert.equal(fs.existsSync(path.join(root, "learn")), false);
});
