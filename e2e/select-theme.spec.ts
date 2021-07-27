import { firefox, chromium, webkit, Browser, Page } from "playwright";
import { v4 as uuidv4} from "uuid";

jest.setTimeout(10000);

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
    { preferredTheme: "light", option: "System", },
    { preferredTheme: "dark", option: "System", },
    { preferredTheme: "no-preference", option: "System", },
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
        await page.goto("http://localhost:8080");

        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$("input[type=submit]:text('Join!')")).click();
      });

      afterEach(async () =>
      {
        await page.close();
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

  describe(
    "When a user selects a theme and refreshes the page.",
    () =>
    {
      let page: Page;

      beforeEach(async () =>
      {
        page = await browser.newPage({ colorScheme: "light" });
        await page.goto("http://localhost:8080");

        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$("input[type=submit]:text('Join!')")).click();
      });

      afterEach(async () =>
      {
        await page.close();
      });

      // Flaky test, fails on random expects in random browsers.
      it("Selects that theme regardless of browser preference.", async () =>
      {
        const selector = `input[type=radio]:left-of(:text("Dark"))`;

        const initialOption = await page.waitForSelector(selector);

        expect(await initialOption.isChecked()).toBe(false);

        await initialOption.click();

        expect(await initialOption.isChecked()).toBe(true);

        await page.reload();

        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$("input[type=submit]:text('Join!')")).click();

        const reloadedOption = await page.waitForSelector(selector);

        expect(await reloadedOption.isChecked()).toBe(true);
      });
    }
  )
});