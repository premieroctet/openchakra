import { useEffect, useRef } from "react";

const useFocusEffect = (initialFocusRef, isOpen) => {
  /**
   * Keep a reference to the previously active element
   * to restore focus back
   */
  const activeElementRef = useRef();
  // Accessibility: focus on the input if the modal is open
  useEffect(() => {
    // If isOpen is set to `true`
    if (isOpen && initialFocusRef.current) {
      // Assign the activeElement to the ref
      activeElementRef.current = document.activeElement;
      // Focus the element with the initialFocusRef
      initialFocusRef.current.focus();
    } else {
      // else, return focus to the triggering element
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      }
    }
  }, [isOpen]);
};

export default useFocusEffect;
