import { createInterface } from "node:readline/promises";
import { stdin, stdout, env, platform } from "node:process";
import { mkdir, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const url = process.env.DEMO_URL ?? "http://localhost:3001";
const recordingDirectory = path.resolve("recordings");
const viewport = { width: 1280, height: 800 };
const braveCandidates = platform === "darwin"
  ? [
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    path.join(homedir(), "Applications/Brave Browser.app/Contents/MacOS/Brave Browser"),
  ]
  : [];
const bravePath = env.BRAVE_PATH ?? braveCandidates.find(existsSync);

await mkdir(recordingDirectory, { recursive: true });

let browser;
let context;
const terminal = createInterface({ input: stdin, output: stdout });

try {
  browser = await chromium.launch({
    headless: false,
    ...(bravePath ? { executablePath: bravePath } : {}),
  });
  context = await browser.newContext({
    viewport,
    recordVideo: {
      dir: recordingDirectory,
      size: viewport,
    },
  });

  const page = await context.newPage();
  const video = page.video();
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });

  if (!response?.ok()) {
    console.warn(`The page responded with HTTP ${response?.status() ?? "unknown"}.`);
  }

  console.log(`Recording ${url} in the opened ${bravePath ? "Brave" : "Chromium"} window.`);
  console.log("Click through your demo, then press Enter here to finish and save the video.");
  await terminal.question("");

  await context.close();
  context = undefined;

  const temporaryPath = await video.path();
  const timestamp = new Date().toISOString().replaceAll(":", "-");
  const outputPath = path.join(recordingDirectory, `demo-${timestamp}.webm`);
  await rename(temporaryPath, outputPath);
  console.log(`Saved recording: ${path.relative(process.cwd(), outputPath)}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  terminal.close();
  await context?.close().catch(() => {});
  await browser?.close().catch(() => {});
}
