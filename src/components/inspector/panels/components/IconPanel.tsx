import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";
import InputSuggestion from "../../inputs/InputSuggestion";
import theme from "../../../../theme/theme";
import { Icon } from "@chakra-ui/core";
import { Icons } from "@chakra-ui/core/dist/theme/icons";
import { ComboboxOption, ComboboxOptionText } from "@reach/combobox";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const IconPanel = () => {
  const { setValueFromEvent } = useForm();

  const name = usePropsSelector("name");
  const fontSize = usePropsSelector("fontSize");

  return (
    <>
      <FormControl label="Icon" htmlFor="name">
        <InputSuggestion
          value={name}
          handleChange={setValueFromEvent}
          name="name"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(name) || !name)
            .map(icon => (
              <ComboboxOption value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <FormControl label="Font size" htmlFor="fontSize">
        <InputSuggestion
          value={fontSize}
          handleChange={setValueFromEvent}
          name="fontSize"
        >
          {Object.keys(theme.fontSizes).map(option => (
            <ComboboxOption value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <ColorsControl withFullColor label="Color" name="color" enableHues />
    </>
  );
};

export default memo(IconPanel);
