import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import useDispatch from "./useDispatch";
import { RootState } from "..";

export const useForm = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.app.selectedId);

  const setValueFromEvent = ({
    target: { name, value }
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value);
  };

  const setValue = (name: string, value: any) => {
    dispatch.app.updateProps({
      id: selectedId,
      name,
      value
    });
  };

  return { setValue, setValueFromEvent, selectedId };
};
