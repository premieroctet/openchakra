import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import useDispatch from "./useDispatch";
import { RootState } from "..";

export const useForm = () => {
  const dispatch = useDispatch();
  const componentId = useSelector((state: RootState) => state.app.selected.id);

  const setValueFromEvent = ({
    target: { name, value }
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value);
  };

  const setValue = (name: string, value: any) => {
    dispatch.components.updateProps({
      id: componentId,
      name,
      value
    });
  };

  return { setValue, setValueFromEvent };
};
