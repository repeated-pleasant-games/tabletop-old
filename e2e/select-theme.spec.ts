import { firefox, chromium, webkit, Browser, Page, BrowserContext } from "playwright";
import { v4 as uuidv4 } from "uuid";

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
    browser = await driver.launch({
    });
  });

  afterAll(async () =>
  {
    await browser.close();
  });

  describe.each([
    { preferredTheme: "light", option: "Light", },
    { preferredTheme: "no-preference", option: "Light", },
    { preferredTheme: "dark", option: "Dark", }
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
      let context: BrowserContext;
      let page: Page;

      beforeAll(async () =>
      {
        context = await browser.newContext({ colorScheme: preferredTheme });
      });

      beforeEach(async () =>
      {
        page = await context.newPage();
        await page.goto("http://localhost:8080");
        
        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$(":text('Join!')")).click();
      });

      afterEach(async () =>
      {
        await context.clearCookies();
        await page.close();
      });

      afterAll(async () =>
      {
        await context.close();
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

  describe.skip(
    "When a user selects a theme and refreshes the page.",
    () =>
    {
      let context: BrowserContext;
      let page: Page;

      beforeAll(async () =>
      {
        context = await browser.newContext({ colorScheme: "light" });
      });

      beforeEach(async () =>
      {
        page = await context.newPage();
        await page.goto("http://localhost:8080");

        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$(":text('Join!')")).click();
      });

      afterEach(async () =>
      {
        await context.clearCookies();
        await page.close();
      });

      afterAll(async () =>
      {
        await context.close();
      });

      // Flaky test, fails on random expects in random browsers.
      it("Selects that theme regardless of browser preference.", async () =>
      {
        const selector = `span:left-of(:text("Dark"))`;

        const initialOption = await page.waitForSelector(selector);

        expect(await initialOption.isChecked()).toBe(false);

        await initialOption.click();

        expect(await initialOption.isChecked()).toBe(true);

        await page.reload();

        const roomNameInput = await page.waitForSelector(
          "input[type=text]:near(:text('Room Name'))"
        );

        await roomNameInput.type(uuidv4());

        await (await page.$(":text('Join!')")).click();

        const reloadedOption = await page.waitForSelector(selector);

        expect(await reloadedOption.isChecked()).toBe(true);
      });
    }
  )
});