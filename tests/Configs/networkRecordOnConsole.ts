import { chromium, Page, Request, Response } from 'playwright';

/**
 * Records listesners in the page so it can pritnt each  request y response.
 * @param page Objeto Page de Playwright
 */
export function monitorearRed(page: Page): void {
  // listens and formats the request
  page.on('request', (request: Request) => {
    console.log(`➡️ [REQUEST] ${request.method()} | ${request.url()}`);
  });

  // listens and formats the responses
  page.on('response', (response: Response) => {
    console.log(`⬅️ [RESPONSE] ${response.status()} ${response.statusText()} | ${response.url()}`);
  });
}

export async function main() {
  // launchs the navigator
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Turning on the monitoring before navigating to the page
  monitorearRed(page);

  console.log('Starting navigation');
  
  // 2. Naviating to the page
  await page.goto('https://example.com');

  // We wait 2 seconds so we can capture the secondary asynchronus petitions Esperamos 2 segundos para capturar peticiones asíncronas secundarias
  await page.waitForTimeout(2000);

  await browser.close();
}

main().catch((error) => console.error('Error during execution', error));