import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

const aliases = new Map([
  ["Win", "Meta"],
  ["Scroll", "ScrollLock"],
  ["Spacebar", " "],
  ["Down", "ArrowDown"],
  ["Left", "ArrowLeft"],
  ["Right", "ArrowRight"],
  ["Up", "ArrowUp"],
  ["Del", "Delete"],
  ["Crsel", "CrSel"],
  ["Exsel", "ExSel"],
  ["Apps", "ContextMenu"],
  ["Esc", "Escape"],
  ["Decimal", "."],
  ["Multiply", "*"],
  ["Add", "+"],
  ["Subtract", "-"],
  ["Divide", "/"],
]);

const shimKeyboardEvent = (event: any) => {
  if (aliases.has(event.key)) {
    const key = aliases.get(event.key);

    Object.defineProperty(event, "key", {
      configurable: true,
      enumerable: true,
      get() {
        return key;
      },
    });
  }
};

const useKeypress = (keys: any, handler: any) => {
  invariant(
    Array.isArray(keys) || typeof keys === "string",
    "Expected `keys` to be an array or string"
  );
  if (Array.isArray(keys)) {
    keys.forEach((key, i) => {
      invariant(
        typeof key === "string",
        `Expected \`keys[${i}]\` to be a string`
      );
    });
  }
  invariant(
    typeof handler === "function" || handler == null,
    "Expected `handler` to be a function"
  );

  const eventListenerRef = useRef<undefined | ((event: any) => void)>();

  useEffect(() => {
    eventListenerRef.current = (event) => {
      shimKeyboardEvent(event);
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        if (handler) {
          handler(event);
        }
      }
    };
  }, [keys, handler]);

  useEffect(() => {
    const eventListener = (event: any) => {
      eventListenerRef.current?.(event);
    };
    window.addEventListener("keydown", eventListener);
    return () => {
      window.removeEventListener("keydown", eventListener);
    };
  }, []);
};

export default useKeypress;
