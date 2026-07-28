import { test, expect, Page, BrowserContext } from "@playwright/test";

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY 1 — Wait for Cloudflare challenge to auto-resolve
// Cloudflare's JS challenge ("Checking your browser...") usually resolves
// automatically in 5-10 s. This strategy simply waits it out.
// ─────────────────────────────────────────────────────────────────────────────
async function waitForCloudflareChallenge(page: Page): Promise<void> {
  const cloudflareSelectors = [
    "#challenge-running",
    "#cf-challenge-running",
    "#challenge-form",
    'div[class*="cf-browser-verification"]',
    'div[id*="cf-"]',
  ];

  // Give the page a moment to load
  await page.waitForTimeout(2000);

  let isCloudflarePage = false;
  for (const selector of cloudflareSelectors) {
    const el = await page.$(selector);
    if (el) {
      isCloudflarePage = true;
      console.log(`Cloudflare challenge detected (selector: ${selector})`);
      break;
    }
  }

  // Also check by title / body text
  if (!isCloudflarePage) {
    const title = await page.title();
    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (
      title.includes("Just a moment") ||
      bodyText.includes("Checking your browser") ||
      bodyText.includes("DDoS protection by Cloudflare")
    ) {
      isCloudflarePage = true;
      console.log("Cloudflare challenge detected (title/body text)");
    }
  }

  if (isCloudflarePage) {
    console.log("Waiting for Cloudflare to auto-resolve (up to 30 s)…");
    // Wait until the challenge elements disappear OR the real page content arrives
    await page
      .waitForFunction(
        () => {
          const title = document.title;
          const hasCfChallenge =
            !!document.querySelector("#challenge-running") ||
            !!document.querySelector("#cf-challenge-running") ||
            title.includes("Just a moment");
          return !hasCfChallenge;
        },
        { timeout: 30_000 }
      )
      .catch(() => {
        console.warn(
          "Cloudflare challenge did not auto-resolve — proceeding anyway."
        );
      });

    // Small buffer after challenge resolves
    await page.waitForTimeout(1000);
    console.log("Cloudflare challenge passed (or timed out).");
  }
}

/*

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY 2 — Spoof navigator.webdriver and related JS properties
// Injected before every page load via addInitScript.
// ─────────────────────────────────────────────────────────────────────────────
async function injectStealthScripts(context: BrowserContext): Promise<void> {
  await context.addInitScript(() => {
    // Remove the automation flag
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });

    // Fake plugins list (empty in headless Chrome)
    Object.defineProperty(navigator, "plugins", {
      get: () => [1, 2, 3, 4, 5],
    });

    // Fake language
    Object.defineProperty(navigator, "languages", {
      get: () => ["en-US", "en"],
    });

    // Fake permissions query (Notification)
    const originalQuery = window.navigator.permissions?.query;
    if (originalQuery) {
      // @ts-ignore
      window.navigator.permissions.query = (parameters: any) =>
        parameters.name === "notifications"
          ? Promise.resolve({ state: Notification.permission } as any)
          : originalQuery(parameters);
    }

    // Remove Chrome DevTools protocol property
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY 3 — Reuse authenticated browser state (session cookies)
// Run once manually, save cookies, then reuse them in CI/automation.
// This is the most reliable long-term approach for a staging environment.
// ─────────────────────────────────────────────────────────────────────────────
async function saveBrowserState(page: Page): Promise<void> {
  // After you've manually solved the CAPTCHA once in the browser,
  // call this to persist the cookies / local storage.
  await page.context().storageState({ path: "auth-state.json" });
  console.log("Browser state saved to auth-state.json");
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────────────────────────────────────────

const TARGET_URL = "https://staging.wallstreetprepdev.com/my-courses";

// ----- Test A: Auto-resolve JS challenge (no interactive CAPTCHA) -----
test("my-courses page loads after Cloudflare JS challenge", async ({
  page,
  context,
}) => {
  // Inject stealth scripts before navigation
  await injectStealthScripts(context);

  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });

  // Wait out the automated challenge
  await waitForCloudflareChallenge(page);

  // Assert we've reached the real page
  await expect(page).not.toHaveTitle(/Just a moment/);
  await expect(page).toHaveURL(/wallstreetprepdev/);

  // Example: assert a heading or key element on the real page
  // await expect(page.locator('h1')).toBeVisible();

  console.log("Final URL:", page.url());
  console.log("Page title:", await page.title());
});

// ----- Test B: Use saved auth state (most reliable for CI) -----
// To generate auth-state.json, run: npx playwright codegen --save-storage=auth-state.json https://staging.wallstreetprepdev.com
// Or run the "save state" test below once manually.
test.describe("With saved auth state", () => {
  test.use({ storageState: "auth-state.json" }); // comment out if file doesn't exist yet

  test("my-courses page loads with pre-authenticated cookies", async ({
    page,
  }) => {
    await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });
    await waitForCloudflareChallenge(page);

    await expect(page).not.toHaveTitle(/Just a moment/);
    console.log("Loaded with saved auth state:", await page.title());
  });
});

// ----- Test C: Manual helper — run this ONCE to save auth state -----
// Set env var SAVE_STATE=true, solve CAPTCHA manually, then state is saved.
test("SETUP: save browser state after manual CAPTCHA solve", async ({
  page,
  context,
}) => {
  test.skip(
    process.env.SAVE_STATE !== "true",
    "Only runs when SAVE_STATE=true"
  );

  await injectStealthScripts(context);

  // Open the page; solve the CAPTCHA manually in the browser window
  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });

  console.log(
    "👆  Solve the CAPTCHA in the browser window, then press Enter here…"
  );
  // Pause gives you time to interact with the browser
  await page.pause();

  await saveBrowserState(page);
});
*/