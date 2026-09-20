(function (root) {
  "use strict";

  const robotNames = ["Beep", "Boop", "Byte"];

  function formatVariableSentence(name, points) {
    const safeName = String(name).trim() || "Learner";
    const numericPoints = Number(points);
    const noun = numericPoints === 1 ? "point" : "points";
    return `${safeName} has ${numericPoints} ${noun}.`;
  }

  function getLoopStep(step, names = robotNames) {
    if (step < 0) {
      return { activeIndex: -1, message: "Press “Next step” to begin.", complete: false };
    }

    if (step >= names.length) {
      return {
        activeIndex: -1,
        message: `Loop complete—${names.length} robots waved!`,
        complete: true
      };
    }

    return {
      activeIndex: step,
      message: `Step ${step + 1}: ${names[step]} waves hello.`,
      complete: false
    };
  }

  function pushStack(stack, value, limit = 4) {
    const label = String(value).trim();
    if (!label) {
      return { stack: [...stack], message: "Type a label before pushing." };
    }

    if (stack.length >= limit) {
      return { stack: [...stack], message: `This demo stack holds up to ${limit} blocks.` };
    }

    const nextStack = [...stack, label];
    return { stack: nextStack, message: `${label} is now on top.` };
  }

  function popStack(stack) {
    if (stack.length === 0) {
      return { stack: [], message: "The stack is empty—push a block first." };
    }

    const nextStack = stack.slice(0, -1);
    const removed = stack[stack.length - 1];
    const message = nextStack.length
      ? `Popped ${removed}. ${nextStack[nextStack.length - 1]} is now on top.`
      : `Popped ${removed}. The stack is empty.`;
    return { stack: nextStack, message };
  }

  function initializePage(documentRef) {
    const nameInput = documentRef.querySelector("#learner-name");
    const pointsInput = documentRef.querySelector("#learner-points");
    const variableOutput = documentRef.querySelector("#variable-output");
    const pointsLabel = documentRef.querySelector("#points-label");
    const nameMemory = documentRef.querySelector("#name-memory");
    const pointsMemory = documentRef.querySelector("#points-memory");

    function updateVariableDemo() {
      const name = nameInput.value.trim() || "Learner";
      variableOutput.textContent = formatVariableSentence(name, pointsInput.value);
      pointsLabel.textContent = pointsInput.value;
      nameMemory.textContent = `"${name}"`;
      pointsMemory.textContent = pointsInput.value;
    }

    nameInput.addEventListener("input", updateVariableDemo);
    pointsInput.addEventListener("input", updateVariableDemo);

    const robots = [...documentRef.querySelectorAll(".robot")];
    const loopStatus = documentRef.querySelector("#loop-status");
    const nextButton = documentRef.querySelector("#loop-next");
    const resetButton = documentRef.querySelector("#loop-reset");
    let loopStep = -1;

    function renderLoop() {
      const state = getLoopStep(loopStep);
      robots.forEach((robot, index) => robot.classList.toggle("active", index === state.activeIndex));
      loopStatus.textContent = state.message;
      nextButton.textContent = state.complete ? "Run again" : "Next step";
    }

    nextButton.addEventListener("click", () => {
      loopStep = loopStep >= robotNames.length ? 0 : loopStep + 1;
      renderLoop();
    });

    resetButton.addEventListener("click", () => {
      loopStep = -1;
      renderLoop();
    });

    const stackInput = documentRef.querySelector("#stack-value");
    const stackVisual = documentRef.querySelector("#stack-visual");
    const stackStatus = documentRef.querySelector("#stack-status");
    const pushButton = documentRef.querySelector("#stack-push");
    const popButton = documentRef.querySelector("#stack-pop");
    let stack = ["A"];

    function renderStack(message) {
      stackVisual.replaceChildren();
      stack.forEach((label) => {
        const block = documentRef.createElement("span");
        block.className = "stack-block";
        block.textContent = label;
        stackVisual.append(block);
      });
      stackVisual.setAttribute(
        "aria-label",
        stack.length ? `Stack from bottom to top: ${stack.join(", ")}` : "Empty stack"
      );
      stackStatus.textContent = message;
    }

    pushButton.addEventListener("click", () => {
      const result = pushStack(stack, stackInput.value);
      stack = result.stack;
      renderStack(result.message);
      if (stack.length < 4) {
        stackInput.value = String.fromCharCode(65 + stack.length);
      }
    });

    popButton.addEventListener("click", () => {
      const result = popStack(stack);
      stack = result.stack;
      renderStack(result.message);
    });

    documentRef.querySelector("#current-year").textContent = String(new Date().getFullYear());
  }

  const api = { formatVariableSentence, getLoopStep, pushStack, popStack };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (root && root.document) {
    root.document.addEventListener("DOMContentLoaded", () => initializePage(root.document));
  }
})(typeof window !== "undefined" ? window : globalThis);
