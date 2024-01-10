import puppeteer, { Page } from "puppeteer";
import "dotenv/config";
const start = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // Specify the path to your Chrome executable

      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    test("https://ienabler.ug.edu.gh/pls/prodi41/w99pkg.mi_login", page);
  } catch (error) {
    console.log(error);
  }

  // await page.screenshot({ path: "example.png" });
  // await browser.close();
};
const test = async (url: string, page: Page) => {
  try {
    const ID = process.env.ID;
    const PIN = process.env.PIN;
    await page.goto(url);
    await page.type(
      "#login_right > div > form > input:nth-child(12)",
      `${ID}`,
      { delay: 100 }
    );
    await page.type(
      "#login_right > div > form > input:nth-child(14)",
      `${PIN}`
    );
    await page.click("#login_right > div > form > input:nth-child(16)");
    await page.waitForNavigation();
    await page.click("body > header > a");
    // Wait for the iframe to load
    await page.waitForSelector("#F1");

    // Switch to the iframe
    const iframeHandle = await page.$("#F1");
    const iframe = await iframeHandle!.contentFrame();
    // Wait for the menu item to be available in the iframe
    await iframe!.waitForSelector("#menuId28");
    // Click on the menu item inside the iframe
    await iframe!.click("#menuId28", { delay: 1000 });
    await iframe!.waitForSelector("#menuId30");
    await iframe!.click("#menuId30");
    await page.waitForNetworkIdle({ idleTime: 1000 });
    for (let i = 0; i <= 8; i++) {
      await page.keyboard.press("Tab", { delay: 500 });
      if (i == 8) {
        await page.keyboard.press("Enter");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
start();
