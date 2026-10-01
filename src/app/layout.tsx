import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { env } from "@/env";

const appName = "bootstrap-saas-app";
const description = "A SaaS starter built with Next.js, Neon Postgres, and magic-link authentication.";

export const metadata: Metadata = {
	metadataBase: new URL(
		env.SITE_URL ||
			(process.env.VERCEL_PROJECT_PRODUCTION_URL
				? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
				: "http://localhost:3000"),
	),
	applicationName: appName,
	title: {
		default: appName,
		template: `%s | ${appName}`,
	},
	description,
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: appName,
		title: appName,
		description,
	},
	twitter: {
		card: "summary",
		title: appName,
		description,
	},
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body>{children}</body>
		</html>
	);
}
