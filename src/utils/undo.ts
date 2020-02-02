import { Action } from "@rematch/core";

export default function filterActions(action: Action) {
  if (
    ["app/addComponent", "app/removeComponent", "app/updateProps"].includes(
      action.type
    )
  ) {
    return true;
  }

  return false;
}
