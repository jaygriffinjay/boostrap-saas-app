import { H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "Database",
	slug: "database",
	description: "Understand the Drizzle schema, Neon connection, and database scripts.",
	order: 2,
	section: "Services",
} as const;

export default function DatabaseDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				The app uses Neon Postgres through Drizzle ORM and the <InlineCode>postgres</InlineCode> driver.
				Keep schema changes in source control and target the intended Neon branch before running
				database commands.
			</Paragraph>

			<section>
				<H2>Project files</H2>
				<List>
					<ListItem><InlineCode>src/server/db/schema.ts</InlineCode> declares tables and indexes.</ListItem>
					<ListItem><InlineCode>src/server/db/index.ts</InlineCode> creates the shared Drizzle database client.</ListItem>
					<ListItem><InlineCode>drizzle.config.ts</InlineCode> points Drizzle Kit at the schema and uses <InlineCode>DATABASE_URL</InlineCode>.</ListItem>
				</List>
				<Paragraph>
					Tables use the <InlineCode>neontest_</InlineCode> prefix through the schema's table creator.
					Use that convention for new tables unless you intentionally change the project schema setup.
				</Paragraph>
			</section>

			<section>
				<H2>Database commands</H2>
				<List>
					<ListItem><InlineCode>npm run db:generate</InlineCode> creates migration files from schema changes.</ListItem>
					<ListItem><InlineCode>npm run db:migrate</InlineCode> applies generated migrations.</ListItem>
					<ListItem><InlineCode>npm run db:push</InlineCode> pushes the current schema directly; use for disposable development databases, not as a substitute for reviewed production migrations.</ListItem>
					<ListItem><InlineCode>npm run db:studio</InlineCode> starts Drizzle Studio.</ListItem>
				</List>
			</section>

			<section>
				<H2>Before changing the schema</H2>
				<H3>Check the target branch</H3>
				<Paragraph>
					Confirm <InlineCode>DATABASE_URL</InlineCode> points to the intended project and branch before
					generating or applying changes. Neon branches isolate data, making a development branch a
					good place to try schema changes before production.
				</Paragraph>
				<Paragraph>
					For project provisioning and environment setup, see <Link href="/docs/neon">Neon setup</Link>.
				</Paragraph>
			</section>
		</div>
	);
}
