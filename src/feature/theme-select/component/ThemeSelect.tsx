import React from "react";
import { useLocalStore } from "@/hook/useLocalStore";

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const ThemeSelect = () =>
{
  const { themePreference, setThemePreference } = useLocalStore(
    ({ themePreference, setThemePreference }) =>
    ({
      themePreference,
      setThemePreference,
    })
  );

  return (
    <RadioGroup onChange={setThemePreference} value={themePreference}>
      <Stack direction="row">
        <Radio value="light">Light</Radio>
        <Radio value="system">System</Radio>
        <Radio value="dark">Dark</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default ThemeSelect;