import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public');
const demoUrl = 'https://e-commerce-crwn-clothing.vercel.app';

const desktopViewport = { width: 1280, height: 800 };
const mobileViewport = { width: 390, height: 844 };

async function captureViewportScreenshot(page, viewport, fileName) {
  await page.setViewportSize(viewport);
  await page.goto(demoUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const filePath = path.join(outputDir, fileName);
  await page.screenshot({
    path: filePath,
    fullPage: false,
    animations: 'disabled',
  });

  return filePath;
}

async function buildComposite(desktopPath, mobilePath) {
  const desktop = await readFile(desktopPath);
  const mobile = await readFile(mobilePath);

  const desktopDataUrl = `data:image/png;base64,${desktop.toString('base64')}`;
  const mobileDataUrl = `data:image/png;base64,${mobile.toString('base64')}`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1400px;
        height: 860px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 48px;
        background: linear-gradient(180deg, #f7f7f7 0%, #ececec 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .device {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .label {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #5a5a5a;
      }
      .laptop-shell {
        padding: 14px 14px 22px;
        border-radius: 18px;
        background: #1a1a1a;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
      }
      .laptop-screen {
        width: 960px;
        height: 600px;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
      }
      .laptop-screen img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
      }
      .laptop-base {
        width: 1040px;
        height: 14px;
        margin: 10px auto 0;
        border-radius: 0 0 12px 12px;
        background: #2d2d2d;
      }
      .phone-shell {
        padding: 14px 10px;
        border-radius: 34px;
        background: #1a1a1a;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
      }
      .phone-screen {
        width: 280px;
        height: 606px;
        border-radius: 24px;
        overflow: hidden;
        background: #fff;
      }
      .phone-screen img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="device">
      <div class="label">Desktop</div>
      <div class="laptop-shell">
        <div class="laptop-screen">
          <img src="${desktopDataUrl}" alt="Crwn Clothing desktop view" />
        </div>
        <div class="laptop-base"></div>
      </div>
    </div>
    <div class="device">
      <div class="label">Mobile</div>
      <div class="phone-shell">
        <div class="phone-screen">
          <img src="${mobileDataUrl}" alt="Crwn Clothing mobile view" />
        </div>
      </div>
    </div>
  </body>
</html>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const desktopPath = await captureViewportScreenshot(page, desktopViewport, 'demo-desktop-temp.png');
  const mobilePath = await captureViewportScreenshot(page, mobileViewport, 'demo-mobile-temp.png');

  const compositeHtml = await buildComposite(desktopPath, mobilePath);
  const compositeHtmlPath = path.join(outputDir, 'demo-composite-temp.html');
  await writeFile(compositeHtmlPath, compositeHtml);

  await page.setViewportSize({ width: 1400, height: 860 });
  await page.goto(`file://${compositeHtmlPath}`);
  await page.waitForTimeout(300);

  const outputPath = path.join(outputDir, 'Crwn Clothing.png');
  await page.screenshot({
    path: outputPath,
    fullPage: false,
    animations: 'disabled',
  });

  await browser.close();

  console.log(`Saved demo image to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});