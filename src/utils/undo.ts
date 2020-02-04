import { Action } from "@rematch/core";

export default function filterActions(action: Action) {
  if (
    ["components/addComponent", "components/removeComponent", "components/updateProps"].includes(
      action.type
    )
  ) {
    return true;
  }

  return false;
}
