import React, { ReactNode } from "react";
import { FormLabel, FormControl as ChakraFormControl } from "@chakra-ui/core";

type FormControlPropType = {
  label: ReactNode;
  children: ReactNode;
  htmlFor?: string;
  width?: string;
};

const FormControl: React.FC<FormControlPropType> = ({
  label,
  htmlFor,
  children,
  width
}) => {
  return (
    <ChakraFormControl
      mb={2}
      display="flex"
      alignItems="center"
      justifyItems="center"
    >
      <FormLabel
        p={0}
        mr={2}
        lineHeight="1rem"
        width={width || "4rem"}
        fontSize="xs"
        htmlFor={htmlFor}
      >
        {label}
      </FormLabel>
      {children}
    </ChakraFormControl>
  );
};

export default FormControl;
