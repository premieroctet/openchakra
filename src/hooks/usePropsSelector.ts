import { useSelector } from "react-redux";
import { RootState } from "..";

const usePropsSelector = (propsName: string) => {
  return useSelector(
    (state: RootState) =>
      state.components.present.components[state.app.selected.id].props[
        propsName
      ]
  );
};

export default usePropsSelector;
