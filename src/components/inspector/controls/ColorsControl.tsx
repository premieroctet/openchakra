import React, { ReactNode, useState } from "react";
import {
  theme,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Grid,
  Tooltip,
  PseudoBox,
  PopoverBody,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input
} from "@chakra-ui/core";
import FormControl from "./FormControl";
import { useForm } from "../../../hooks/useForm";
import omit from "lodash/omit";
import ColorPicker from "coloreact";
import "react-color-picker/index.css";

type ColorControlPropsType = {
  name: string;
  label: string | ReactNode;
  value: string;
  enableHues?: boolean;
  withFullColor?: boolean;
};

const ColorsControl = (props: ColorControlPropsType) => {
  const { setValue, setValueFromEvent } = useForm();
  const [hue, setHue] = useState(500);

  const themeColors: any = omit(theme.colors, [
    "transparent",
    "current",
    "whiteAlpha",
    "black",
    "white"
  ]);

  let propsIconButton: any = { bg: props.value };
  if (props.value && themeColors[props.value]) {
    propsIconButton = { variantColor: props.value };
  }

  const huesPicker = (
    <>
      <Grid mb={2} templateColumns="repeat(5, 1fr)" gap={0}>
        {Object.keys(themeColors).map(colorName => (
          <Tooltip
            hasArrow
            aria-label={colorName}
            label={props.enableHues ? `${colorName}.${hue}` : colorName}
            placement="top"
            zIndex={3}
          >
            <PseudoBox
              _hover={{ shadow: "lg" }}
              cursor="pointer"
              bg={`${colorName}.${props.enableHues ? hue : 500}`}
              onClick={() =>
                setValue(
                  props.name,
                  props.enableHues ? `${colorName}.${hue}` : colorName
                )
              }
              mt={2}
              rounded="full"
              height="30px"
              width="30px"
            />
          </Tooltip>
        ))}
      </Grid>

      {props.enableHues && (
        <Slider
          onChange={value => setHue(value)}
          min={100}
          max={900}
          step={100}
          value={hue}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb size={8}>
            <Box rounded="full" fontSize="xs">
              {hue}
            </Box>
          </SliderThumb>
        </Slider>
      )}
    </>
  );

  return (
    <FormControl label={props.label}>
      <Popover placement="bottom">
        <PopoverTrigger>
          <IconButton
            mr={2}
            shadow="md"
            border={props.value ? "none" : "2px solid grey"}
            isRound
            aria-label="Color"
            size="xs"
            {...propsIconButton}
          >
            {props.label}
          </IconButton>
        </PopoverTrigger>

        <PopoverContent width="200px" usePortal zIndex={1}>
          <PopoverArrow />
          <PopoverBody>
            {props.withFullColor ? (
              <Tabs size="sm" variant="soft-rounded" variantColor="green">
                <TabList>
                  <Tab>Theme</Tab>
                  <Tab>All</Tab>
                </TabList>
                <TabPanels mt={4}>
                  <TabPanel>{huesPicker}</TabPanel>

                  <TabPanel>
                    <Box position="relative" height="150px">
                      <ColorPicker
                        color={props.value}
                        onChange={(color: any) => {
                          setValue(props.name, `#${color.hex}`);
                        }}
                      />
                      );
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              huesPicker
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Input
        width="100px"
        size="sm"
        name={props.name}
        onChange={setValueFromEvent}
        value={props.value}
      />
    </FormControl>
  );
};

export default ColorsControl;
