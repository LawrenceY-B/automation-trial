import puppeteer, { Page } from "puppeteer";
import "dotenv/config";
const start = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Specify the path to your Chrome executable

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
  await page.type("#login_right > div > form > input:nth-child(12)", `${ID}`);
  await page.type("#login_right > div > form > input:nth-child(14)", `${PIN}`);
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
  await iframe!.click("#menuId28");
  await iframe!.waitForSelector("#menuId30");
  await iframe!.click("#menuId30");

  // Switch to the second iframe
  await page.waitForSelector("#F3");
  const iframe2Handle = await page.$("#F3");
  const iframe2 = await iframe2Handle!.contentFrame();
  await iframe2!.waitForSelector("embed");

  await iframe2?.page().waitForNetworkIdle({ timeout: 9000 });
  await iframe2?.page().screenshot({ path: "trial/example.png", fullPage: true });
  await page.pdf({ path: "trial/hn.pdf", format: "A4" });
  const trial = await iframe2?.evaluate(() => {
    const embed = document.querySelector("embed");
    return embed ? embed.outerHTML : undefined;
  });
  console.log(trial);

 
  
  } catch (error) {
    console.log(error)
  }
  
  
};
start();
