import React from "react";
import { Select } from "@chakra-ui/core";
import FormControl from "../controls/FormControl";
import { useForm } from "../../../hooks/useForm";

const FlexPanel = () => {
  const { values, setValueFromEvent } = useForm();

  return (
    <>
      <FormControl label="Display">
        <Select
          size="sm"
          value={values.display || ""}
          onChange={setValueFromEvent}
          name="display"
        >
          <option>block</option>
          <option>flex</option>
          <option>inline</option>
          <option>grid</option>
          <option>inline-block</option>
        </Select>
      </FormControl>

      {values.display === "flex" && (
        <>
          <FormControl label="Direction">
            <Select
              name="flexDirection"
              size="sm"
              value={values.flexDirection || ""}
              onChange={setValueFromEvent}
            >
              <option>column</option>
              <option>row</option>
            </Select>
          </FormControl>

          <FormControl label="Justify content">
            <Select
              name="justifyContent"
              size="sm"
              value={values.justifyContent || ""}
              onChange={setValueFromEvent}
            >
              <option>start</option>
              <option>center</option>
              <option>end</option>
              <option>space-between</option>
              <option>space-around</option>
            </Select>
          </FormControl>

          <FormControl label="Align items">
            <Select
              name="alignItems"
              size="sm"
              value={values.alignItems || ""}
              onChange={setValueFromEvent}
            >
              <option>start</option>
              <option>center</option>
              <option>end</option>
              <option>space-between</option>
              <option>space-around</option>
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default FlexPanel;
