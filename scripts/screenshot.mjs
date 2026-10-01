import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const assetDirectory = new URL("../assets/", import.meta.url);
const outputPath = fileURLToPath(new URL("homepage.png", assetDirectory));

await mkdir(assetDirectory, { recursive: true });

const browser = await chromium.launch();

try {
	const page = await browser.newPage({
		viewport: { width: 1280, height: 800 },
		deviceScaleFactor: 1,
		colorScheme: "light",
	});
	const response = await page.goto(url, { waitUntil: "networkidle" });

	if (!response?.ok()) {
		throw new Error(`Page responded with HTTP ${response?.status() ?? "unknown"}.`);
	}

	await page.getByRole("main").waitFor();
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({
		path: outputPath,
		fullPage: true,
		animations: "disabled",
		style: "nextjs-portal { visibility: hidden !important; }",
	});
	console.log(`Saved screenshot: ${outputPath}`);
} finally {
	await browser.close();
}