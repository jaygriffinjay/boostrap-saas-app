import { H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "Getting started",
	slug: "getting-started",
	description: "Set up a fresh app from this development boilerplate.",
	order: 1,
	section: "Overview",
} as const;

export default function GettingStartedDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				This is the internal reference for the Neontest development starter. It records the setup
				steps and conventions that are easy to forget when starting a new app.
			</Paragraph>

			<section>
				<H2>What is included</H2>
				<List>
					<ListItem>Next.js App Router with TypeScript and Tailwind CSS v4.</ListItem>
					<ListItem>Neon Postgres, Drizzle ORM, and Managed Auth magic-link sign-in.</ListItem>
					<ListItem>Shared typography components and shadcn-based UI primitives.</ListItem>
				</List>
			</section>

			<section>
				<H2>Start the app</H2>
				<Paragraph>
					Install dependencies with <InlineCode>npm ci</InlineCode>, configure the environment
					variables described in <Link href="/docs/neon">Neon setup</Link>, then run{" "}
					<InlineCode>npm run dev</InlineCode>.
				</Paragraph>
			</section>

			<section>
				<H2>Useful checks</H2>
				<H3>Before a larger change</H3>
				<Paragraph>
					Use <InlineCode>npm run check</InlineCode> for Biome, <InlineCode>npm run typecheck</InlineCode>
					for TypeScript, and <InlineCode>npm run build</InlineCode> for a production build. Run
					them at meaningful checkpoints, not after every small edit.
				</Paragraph>
			</section>
		</div>
	);
}