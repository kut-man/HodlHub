import { test, expect, request, Browser, Page } from "@playwright/test";

const BASE_URL = "http://localhost:8080";
const LOGIN_URL = `${BASE_URL}/login`;
const APP_URL = "http://localhost:5173";
const TEST_EMAIL = process.env.TEST_EMAIL as string;
const TEST_PASSWORD = process.env.TEST_PASSWORD as string;

async function setupAuthenticatedContext(browser: Browser) {
  const requestContext = await request.newContext();
  const loginResponse = await requestContext.post(
    `${LOGIN_URL}?username=${TEST_EMAIL}&password=${TEST_PASSWORD}`
  );
  expect(loginResponse.ok()).toBeTruthy();
  const storageState = await requestContext.storageState();
  return await browser.newContext({ storageState });
}

async function createPortfolio(page: Page) {
  const portfolioName = "test portfolio" + Math.floor(Math.random() * 1000);
  
  await page.goto(`${APP_URL}/portfolio`);
  await page.getByText("Create Portfolio").click();
  await page.locator('input[name="name"]').fill(portfolioName);
  await page.getByTestId("upsert-portfolio-button").click();
  
  await expect(page.getByText("Add Transaction").first()).toBeVisible();
  await expect(page.getByText(portfolioName).first()).toBeVisible();
  
  return portfolioName;
}

async function selectPortfolio(page, portfolioName) {
  await page
    .getByTestId("portfolio-list-sidebar")
    .getByText(portfolioName)
    .click();
}

async function addTransaction(page, amount = "1") {
  await page.getByText("Add Transaction").first().click();
  await expect(
    page.getByRole("heading").getByText("Add Transaction", { exact: true })
  ).toBeVisible();
  
  await expect(page.getByText("BTC")).toBeVisible();
  await page.locator('input[name="amount"]').fill(amount);
  await page
    .getByRole("button", { name: "Add Transaction", exact: true })
    .click();
    
  await expect(page.getByRole("table")).toBeVisible();
}

test("Login", async ({ page }) => {
  await page.goto(APP_URL);

  await expect(page.getByText("Crypto tracking done right")).toBeVisible();
  await page.getByText("Get Started").click();

  await page.getByLabel("email").fill(TEST_EMAIL);
  await page.getByLabel("password").fill(TEST_PASSWORD);
  await page.getByTestId("login-button").click();

  await expect(page.getByAltText("Avatar")).toBeVisible();
  await page.getByText("Get Started").click();
});

test("Add portfolio", async ({ browser }) => {
  const context = await setupAuthenticatedContext(browser);
  const page = await context.newPage();
  
  await createPortfolio(page);
});

test("Remove portfolio", async ({ browser }) => {
  const context = await setupAuthenticatedContext(browser);
  const page = await context.newPage();
  
  const portfolioName = await createPortfolio(page);
  await selectPortfolio(page, portfolioName);

  await page.getByTestId("portfolio-actions-menu-trigger").click();
  await page.getByText("Remove").click();
  await expect(
    page.getByText(`Remove ${portfolioName} portfolio?`)
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(page.getByText(portfolioName).first()).not.toBeVisible({
    timeout: 5000,
  });
});

test("Add transaction", async ({ browser }) => {
  const context = await setupAuthenticatedContext(browser);
  const page = await context.newPage();
  
  const portfolioName = await createPortfolio(page);
  await selectPortfolio(page, portfolioName);
  await addTransaction(page);
});

test("Remove transaction", async ({ browser }) => {
  const context = await setupAuthenticatedContext(browser);
  const page = await context.newPage();
  
  const portfolioName = await createPortfolio(page);
  await selectPortfolio(page, portfolioName);
  await addTransaction(page);

  await page.getByTestId("asset-actions-menu-trigger").click();
  await page.getByText("Remove").click();
  await page.getByRole("dialog").getByText("Remove", {exact: true}).click();
  await expect(page.getByRole("table")).toBeHidden();
});