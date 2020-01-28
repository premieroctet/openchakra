import { useBuilderContext } from "../contexts/BuilderContext";
import { ChangeEvent } from "react";

export const useForm = () => {
  const { setComponents, components, selectedComponent } = useBuilderContext();

  const values: any = selectedComponent
    ? components[selectedComponent]?.props
    : {};

  const setValueFromEvent = ({
    target: { name, value }
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value);
  };

  const setValue = (name: string, value: any) => {
    if (selectedComponent) {
      const { props, name: componentName } = components[selectedComponent];

      setComponents({
        ...components,
        [componentName]: {
          ...components[componentName],
          props: { ...props, [name]: value }
        }
      });
    }
  };

  return { setValue, values, setValueFromEvent };
};
