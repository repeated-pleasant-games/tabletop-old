import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { setThemePreference } from "~/actions/app";

import { Radio } from "~/components/util/Radio";

export const ThemeSelect = ({
  setThemePreference = (name) => null,
  themePreference = "system",
}: {
  setThemePreference?: (name: string) => void,
  themePreference?: string,
}) =>
(
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

const stateToProps = ({ themePreference }: { themePreference: string }) =>
({
  themePreference,
});

const dispatchToProps = (dispatch: ThunkDispatch<unknown, {}, any>) =>
({
  setThemePreference: (theme: string) => dispatch(setThemePreference(theme)),
});

export default connect(stateToProps, dispatchToProps)(ThemeSelect);