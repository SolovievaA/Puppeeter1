let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});


describe("Github page tests", () => {
     beforeEach(async () => {
       await page.goto("https://github.com/team");
     });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 7000);
});

describe("Github titles of other pages", () => {

  test("Title prising page'", async () => {
    await page.goto("https://github.com/pricing");
    const actual = await page.title();
    expect(actual).toEqual(
      "Pricing · Plans for every developer · GitHub");
  },7000);

  test("Title enterprise page", async () => {
    await page.goto("https://github.com/enterprise");
    const title3 = ".Primer_Brand__SubNav-module__SubNav__heading___MAxf6";
    const actual = await page.$eval(title3, (link) => link.textContent);
    const expected = "Enterprise";
    expect(actual).toContain("Enterprise");
  }, 6000);

  test("Title features page'", async () => {
    await page.goto("https://github.com/features");
    const title = ".h1-mktg.col-7-max.mx-auto";
    const actual = await page.$eval(title, (link) => link.textContent);
    const expected = "The tools you need to build what you want.";
    expect(actual).toContain(expected);
  }, 7000);

})