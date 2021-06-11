export type SetThemePayload =
{
  type: "set theme",
  theme: string,
};
export const setTheme = (theme: string): SetThemePayload =>
({
  type: "set theme",
  theme
});