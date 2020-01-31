import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import useDispatch from "./useDispatch";
import { RootState } from "..";

export const useForm = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.app.selectedId);

  const component = useSelector(
    (state: RootState) => state.app.components[selectedId]
  );

  const values = (component && component.props) || {};

  const setValueFromEvent = ({
    target: { name, value }
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value);
  };

  const setValue = (name: string, value: any) => {
    if (component) {
      const { id } = component;

      dispatch.app.updateProps({
        id,
        name,
        value
      });
    }
  };

  return { setValue, values, setValueFromEvent };
};
