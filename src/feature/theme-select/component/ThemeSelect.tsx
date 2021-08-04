import React from "react";

import { Radio, RadioGroup, Stack, useColorMode } from "@chakra-ui/react";

export const ThemeSelect = () =>
{
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <RadioGroup
      onChange={
        (value) =>
        {
          if (value !== colorMode) toggleColorMode()
        }
      }
      value={colorMode}
    >
      <Stack direction="row">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default ThemeSelect;