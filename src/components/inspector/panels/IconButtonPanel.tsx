import React from "react";
import ColorsControl from "../controls/ColorsControl";
import InputSuggestion from "../inputs/InputSuggestion";
import theme from "../../../theme/theme";
import { Icon, Switch } from "@chakra-ui/core";
import { Icons } from "@chakra-ui/core/dist/theme/icons";
import { ComboboxOption, ComboboxOptionText } from "@reach/combobox";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";
import VariantsControl from "../controls/VariantsControl";
import SizeControl from "../controls/SizeControl";

const IconButtonPanel = () => {
  const { values, setValueFromEvent, setValue } = useForm();

  return (
    <>
      <FormControl label="Icon" htmlFor="icon">
        <InputSuggestion
          value={values.name}
          handleChange={setValueFromEvent}
          name="icon"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(values.name) || !values.name)
            .map(icon => (
              <ComboboxOption value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <SizeControl name="size" label="Size" value={values.size} />

      <ColorsControl label="Color" name="variantColor" value={values.color} />

      <FormControl label="Is Loading" htmlFor="isLoading">
        <Switch
          name="isLoading"
          id="isLoading"
          size="sm"
          isChecked={values.isLoading || false}
          onChange={() => setValue("isLoading", !values.isLoading)}
        />
      </FormControl>
      <FormControl label="Is Round" htmlFor="isRound">
        <Switch
          name="isRound"
          id="isRound"
          size="sm"
          isChecked={values.isRound || false}
          onChange={() => setValue("isRound", !values.isRound)}
        />
      </FormControl>

      <VariantsControl label="Variant" name="variant" value={values.variant} />
    </>
  );
};

export default IconButtonPanel;
