import React from "react";
import { Input } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const ImagePanel = () => {
  const { setValueFromEvent, values } = useForm();

  return (
    <>
      <FormControl label="Source" htmlFor="src">
        <Input
          placeholder="Image URL"
          value={values.src || ""}
          size="sm"
          name="src"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Fallback Src" htmlFor="fallbackSrc">
        <Input
          placeholder="Image URL"
          value={values.fallbackSrc || ""}
          size="sm"
          name="fallbackSrc"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Alt" htmlFor="alt">
        <Input
          value={values.alt || ""}
          size="sm"
          name="alt"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Html height" htmlFor="htmlHeight">
        <Input
          value={values.htmlHeight || ""}
          size="sm"
          name="htmlHeight"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Html width" htmlFor="htmlWidth">
        <Input
          value={values.htmlWidth || ""}
          size="sm"
          name="htmlWidth"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  );
};

export default ImagePanel;
