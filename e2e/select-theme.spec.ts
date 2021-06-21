import { firefox, chromium, webkit, Browser, Page } from "playwright";

describe.each([
  { name: chromium.name(), driver: chromium },
  { name: firefox.name(), driver: firefox },
  { name: webkit.name(), driver: webkit },
])("Theme selection ($name)", ({ name: browserName, driver }) =>
{
  let browser: Browser;
  let page: Page;

  beforeAll(async () =>
  {
    browser = await driver.launch();
  });

  afterAll(async () =>
  {
    await browser.close();
  });

  afterEach(async () =>
  {
    if (page && !page.isClosed())
      await page.close()
  });

  it.each([
    [ "Light", "light" ],
    [ "Dark", "dark" ],
    [ "Light", "no-preference" ]
  ])(
    "Checks '%s' when browser prefers %s colorscheme.",
    async (optionName, colorScheme: "light" | "dark" | "no-preference") =>
    {
      page = await browser.newPage({ colorScheme });

      await page.goto("http://localhost");
      const element = await page.waitForSelector(
        `input[type=radio]:left-of(:text("${optionName}"))`
      );

      expect(await element.isChecked()).toBe(true);
    }
  );
});