import React from "react";
import { useLocalStore } from "@/hook/useLocalStore";

import { Radio } from "@/component/Radio";

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
    <Radio name="set-theme" onChange={setThemePreference}>
      {
        [ "Light", "System", "Dark", ]
        .map(
          (theme) =>
          (
            <Radio.Option
              key={`theme-option-${theme.toLowerCase()}`}
              value={theme.toLowerCase()}
              checked={themePreference === theme.toLowerCase()}
            >
              {theme}
            </Radio.Option>
          )
        )
      }
    </Radio>
  );
};

export default ThemeSelect;