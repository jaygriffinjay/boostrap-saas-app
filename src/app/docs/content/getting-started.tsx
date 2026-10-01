import { H2, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "Getting started",
	slug: "getting-started",
	description: "Prepare a fresh checkout and run the starter locally.",
	order: 1,
	section: "Overview",
} as const;

export default function GettingStartedDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Use this page to get a fresh checkout running. The rest of the internal docs cover the
				individual services and day-to-day development conventions in more detail.
			</Paragraph>

			<section>
				<H2>A new app or another checkout?</H2>
				<List>
					<ListItem>For a new product, use GitHub's Use this template action to create your own repository, then clone that repository. Give the new app its own Neon project.</ListItem>
					<ListItem>For another checkout of an existing app, clone its repository and link to that app's existing Neon project and an appropriate development branch. You do not need a new project for every checkout.</ListItem>
					<ListItem>A Git clone copies committed files, not cloud services, database data, local credentials, or editor extensions. This repo ignores <InlineCode>.env</InlineCode>, <InlineCode>.env*.local</InlineCode>, and <InlineCode>.neon</InlineCode>.</ListItem>
				</List>
			</section>

			<section>
				<H2>Prerequisites</H2>
				<List>
					<ListItem>Use Node.js 24 LTS for a fresh setup. The project's Neon packages require at least Node.js 20.19; optional CLI agent-skill installation requires a newer runtime.</ListItem>
					<ListItem>npm 11, as specified by the project package manager.</ListItem>
					<ListItem>A Neon account. Commands below use <InlineCode>npx neon@latest</InlineCode>, so a global CLI installation is not required.</ListItem>
				</List>
				<Paragraph>
					Check <InlineCode>node --version</InlineCode> and <InlineCode>npm --version</InlineCode>.
					The package manager field records npm's intended version; it does not install Node or
					switch your runtime automatically.
				</Paragraph>
			</section>

			<section>
				<H2>First run</H2>
				<List ordered>
					<ListItem>Open a terminal in the repository root, where <InlineCode>package.json</InlineCode> lives, and run <InlineCode>npm ci</InlineCode>. This installs from the committed lockfile; do not delete it or upgrade everything as part of first-run setup.</ListItem>
					<ListItem>If there is no local env file yet, copy <InlineCode>.env.example</InlineCode> to <InlineCode>.env</InlineCode> before linking Neon. On macOS/Linux, <InlineCode>cp -n .env.example .env</InlineCode> avoids replacing an existing file.</ListItem>
					<ListItem>Follow <Link href="/docs/neon">Neon setup</Link> to authenticate the CLI, choose the project/branch, provision Auth if needed, and fill the required variables. The app cannot start with the blank values in the example file.</ListItem>
					<ListItem>Enable Magic Link in Neon for the selected branch and generate the local cookie secret. These are separate from installing npm dependencies.</ListItem>
					<ListItem>Run <InlineCode>npm run dev</InlineCode>, then open the URL Next.js prints. The port may be 3000, 3001, or another available port.</ListItem>
				</List>
				<Paragraph>
					Until the app starts, read these same TSX documents in <InlineCode>src/app/docs/content/</InlineCode>
					in your editor or on GitHub. Once running, open <InlineCode>/docs</InlineCode> on that
					server for navigation and search. There is no separate docs build or server.
				</Paragraph>
			</section>

			<section>
				<H2>Make the template yours</H2>
				<List>
					<ListItem>Update the package name, README, app metadata in <InlineCode>src/app/layout.tsx</InlineCode>, visible branding, and favicon for your new app.</ListItem>
					<ListItem>Check <InlineCode>git remote -v</InlineCode> before pushing; a clone of the starter still points to the starter unless you change its remote.</ListItem>
					<ListItem>The included UI and typography components are already installed. Do not rerun shadcn initialization unless you intend to replace the theme/configuration.</ListItem>
					<ListItem>The example <InlineCode>posts</InlineCode> schema uses a <InlineCode>neontest_</InlineCode> table prefix. If you change it, also update <InlineCode>tablesFilter</InlineCode> in <InlineCode>drizzle.config.ts</InlineCode> before creating tables. Renaming a prefix on an existing database is a migration, not just branding.</ListItem>
					<ListItem>Review any project-scoped MCP settings under <InlineCode>.vscode/</InlineCode>; your coding assistant's access is separate from the app's database connection.</ListItem>
				</List>
			</section>

			<section>
				<H2>Verify your fresh setup</H2>
				<List ordered>
					<ListItem>Request a fresh magic link on the running app and open it in the same browser. The public callback should establish a session and send you to <InlineCode>/dashboard</InlineCode>.</ListItem>
					<ListItem>Reload the dashboard to check session persistence, then sign out. Visiting it again while signed out should return you to the homepage.</ListItem>
					<ListItem>Check <InlineCode>/docs/getting-started</InlineCode> and follow a sidebar link.</ListItem>
					<ListItem>Run checks at a setup checkpoint, using <Link href="/docs/biome">Biome and editor setup</Link> to understand lint/format results. A successful build or login does not prove the example application tables have been created; use the <Link href="/docs/database">database workflow</Link> when you start using those tables.</ListItem>
				</List>
			</section>

			<section>
				<H2>Where to go next</H2>
				<Paragraph>
					See <Link href="/docs/database">Database</Link> for Drizzle workflows, <Link href="/docs/development-workflow">Development workflow</Link>{" "}
					for project scripts, <Link href="/docs/biome">Biome and editor setup</Link> for formatting and linting,
					and <Link href="/docs/ui-conventions">UI conventions</Link>{" "}
					before adding or styling components.
				</Paragraph>
			</section>
		</div>
	);
}