import { useSelector } from "react-redux";
import { RootState } from "..";

const usePropsSelector = (propsName: string) => {
  const selectedId = useSelector((state: RootState) => state.app.selectedId);

  return useSelector(
    (state: RootState) => state.app.components[selectedId].props[propsName]
  );
};

export default usePropsSelector;
