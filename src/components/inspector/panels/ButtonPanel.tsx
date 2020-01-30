import React from "react";
import VariantsControl from "../controls/VariantsControl";
import ColorsControl from "../controls/ColorsControl";
import SizeControl from "../controls/SizeControl";
import { Icon } from "@chakra-ui/core";
import ChildrenControl from "../controls/ChildrenControl";
import InputSuggestion from "../inputs/InputSuggestion";
import theme from "../../../theme/theme";
import { ComboboxOption, ComboboxOptionText } from "@reach/combobox";
import FormControl from "../controls/FormControl";
import { Icons } from "@chakra-ui/core/dist/theme/icons";
import { useForm } from "../../../hooks/useForm";

const ButtonPanel = () => {
  const { setValueFromEvent, values } = useForm();

  return (
    <>
      <ChildrenControl />

      <SizeControl name="size" label="Size" value={values.size} />

      <VariantsControl label="Variant" name="variant" value={values.variant} />

      <ColorsControl
        label="Variant Color"
        name="variantColor"
        value={values.variantColor}
      />

      <FormControl label="Left icon" htmlFor="leftIcon">
        <InputSuggestion
          value={values.leftIcon}
          handleChange={setValueFromEvent}
          name="leftIcon"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(values.leftIcon) || !values.leftIcon)
            .map(icon => (
              <ComboboxOption value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <FormControl label="Right icon" htmlFor="rightIcon">
        <InputSuggestion
          value={values.rightIcon}
          handleChange={setValueFromEvent}
          name="rightIcon"
        >
          {Object.keys(theme.icons)
            .filter(
              icon => icon.includes(values.rightIcon) || !values.rightIcon
            )
            .map(icon => (
              <ComboboxOption value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>
    </>
  );
};

export default ButtonPanel;
