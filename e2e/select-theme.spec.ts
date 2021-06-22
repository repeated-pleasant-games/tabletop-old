import { firefox, chromium, webkit, Browser, Page } from "playwright";
import { theme } from "~/reducers/app";

describe.each([
  { name: chromium.name(), driver: chromium },
  { name: firefox.name(), driver: firefox },
  { name: webkit.name(), driver: webkit },
])("Theme selection ($name)", ({ driver }) =>
{
  let browser: Browser;

  beforeAll(async () =>
  {
    browser = await driver.launch();
  });

  afterAll(async () =>
  {
    await browser.close();
  });

  describe.each([
    { preferredTheme: "light", option: "Light", },
    { preferredTheme: "dark", option: "Dark", },
    { preferredTheme: "no-preference", option: "Light", },
  ])(
    "When user opens page with no cache and theme preference of '$preferredTheme'.",
    (
      {
        preferredTheme,
        option,
      }: {
        preferredTheme: "light" | "dark" | "no-preference",
        option: string,
      }
    ) =>
    {
      let page: Page;

      beforeEach(async () =>
      {
        page = await browser.newPage({ colorScheme: preferredTheme });
        await page.goto("http://localhost");
      });

      afterEach(async () =>
      {
        await page.close()
      });

      it(
        `Checks option '${option}'.`,
        async () =>
        {
          const element = await page.waitForSelector(
            `input[type=radio]:left-of(:text("${option}"))`
          );

          expect(await element.isChecked()).toBe(true);
        }
      );
    }
  );

  describe.each([
    { from: "light", to: "dark", option: "Dark"},
    { from: "dark", to: "light", option: "Light"},
  ])(
    "When user selects a theme different from their preferred theme.",
    (
      {
        from,
        to,
        option,
      }: {
        from: "light" | "dark" | "no-preference",
        to: "light" | "dark" | "no-preference",
        option: string,
      }
    ) =>
    {
      let page: Page;

      beforeEach(async () =>
      {
        page = await browser.newPage({ colorScheme: from });
        await page.goto("http://localhost");
      });

      afterEach(async () =>
      {
        await page.close();
      });

      it(
        `Switches theme from '${from}' to '${to}' when '${option}' is checked.`,
        async () =>
        {
          const element = await page.waitForSelector(
            `input[type=radio]:left-of(:text("${option}"))`
          );

          await element.click();

          expect(await element.isChecked()).toBe(true);
        }
      );
    }
  );
});