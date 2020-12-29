import { useEffect } from "react";

/**
 * Traps focus within a specified html element
 * @param {HTMLElement} element
 */
function trapFocus(element) {
  // Get all tabbable or focusable elements
  const focusableEls = element.querySelectorAll(
    "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])"
  );

  // To help us cycle through the trap, let's get the first and last elements
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  // Store the keycode for Tab
  const KEYCODE_TAB = 9;

  // Listen for keydown event for when the `tab` key is pressed
  element.addEventListener("keydown", function (event) {
    const isTabPressed = event.key === "Tab" || event.keyCode === KEYCODE_TAB;
    if (!isTabPressed) return;

    // user pressed `shift + tab`
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        event.preventDefault();
      }
    } else {
      // user pressed `tab`
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        event.preventDefault();
      }
    }
  });
}

/**
 * Traps focus within an element whose `ref` is provided
 * @param {import("react").RefObject<HTMLElement>} ref
 * @param {Boolean} isOpen
 */
function useFocusTrap(ref, isOpen) {
  useEffect(() => {
    if (isOpen && ref.current) {
      trapFocus(ref.current);
    }
  }, [isOpen]);
}

export default useFocusTrap;
