import React, { memo } from "react";
import ColorsControl from "../../controls/ColorsControl";
import InputSuggestion from "../../inputs/InputSuggestion";
import theme from "../../../../theme/theme";
import { Icon, Switch } from "@chakra-ui/core";
import { Icons } from "@chakra-ui/core/dist/theme/icons";
import { ComboboxOption, ComboboxOptionText } from "@reach/combobox";
import FormControl from "../../controls/FormControl";
import { useForm } from "../../../../hooks/useForm";
import VariantsControl from "../../controls/VariantsControl";
import SizeControl from "../../controls/SizeControl";
import usePropsSelector from "../../../../hooks/usePropsSelector";

const IconButtonPanel = () => {
  const { setValueFromEvent, setValue } = useForm();

  const name = usePropsSelector("name");
  const size = usePropsSelector("size");
  const isLoading = usePropsSelector("isLoading");
  const isRound = usePropsSelector("isRound");
  const variant = usePropsSelector("variant");

  return (
    <>
      <FormControl label="Icon" htmlFor="icon">
        <InputSuggestion
          value={name}
          handleChange={setValueFromEvent}
          name="icon"
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

      <SizeControl name="size" label="Size" value={size} />

      <ColorsControl label="Color" name="variantColor" />

      <FormControl label="Is Loading" htmlFor="isLoading">
        <Switch
          name="isLoading"
          id="isLoading"
          size="sm"
          isChecked={isLoading || false}
          onChange={() => setValue("isLoading", !isLoading)}
        />
      </FormControl>
      <FormControl label="Is Round" htmlFor="isRound">
        <Switch
          name="isRound"
          id="isRound"
          size="sm"
          isChecked={isRound || false}
          onChange={() => setValue("isRound", !isRound)}
        />
      </FormControl>

      <VariantsControl label="Variant" name="variant" value={variant} />
    </>
  );
};

export default memo(IconButtonPanel);
