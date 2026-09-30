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
				<H2>Prerequisites</H2>
				<List>
					<ListItem>Node.js 20.19 or newer.</ListItem>
					<ListItem>npm 11, as specified by the project package manager.</ListItem>
					<ListItem>A Neon account and Neon CLI access for creating or linking a project.</ListItem>
				</List>
			</section>

			<section>
				<H2>First run</H2>
				<Paragraph>
					Install dependencies with <InlineCode>npm ci</InlineCode>. Create or select a separate Neon
					project for this app, then follow <Link href="/docs/neon">Neon setup</Link> to link it,
					apply <InlineCode>neon.ts</InlineCode>, and configure local environment variables.
				</Paragraph>
				<Paragraph>
					Run <InlineCode>npm run dev</InlineCode> and open the local URL printed by Next.js. The
					home page sends a magic link; after sign-in, the protected destination is{" "}
					<InlineCode>/dashboard</InlineCode>.
				</Paragraph>
			</section>

			<section>
				<H2>Where to go next</H2>
				<Paragraph>
					See <Link href="/docs/database">Database</Link> for Drizzle workflows, <Link href="/docs/development-workflow">Development workflow</Link>{" "}
					for project scripts and checks, and <Link href="/docs/ui-conventions">UI conventions</Link>{" "}
					before adding or styling components.
				</Paragraph>
			</section>
		</div>
	);
}