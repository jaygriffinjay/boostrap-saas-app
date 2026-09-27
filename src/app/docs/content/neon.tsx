import { H2, H3, InlineCode, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "Neon setup",
	slug: "neon",
	description: "Configure Neon Postgres and Managed Auth for a new app or branch.",
	order: 1,
	section: "Services",
} as const;

export default function NeonDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Use a separate Neon project for each app created from this boilerplate. The committed
				<InlineCode>neon.ts</InlineCode> declares Managed Auth and a seven-day lifetime for newly
				created non-default branches.
			</Paragraph>

			<section>
				<H2>Link and configure a project</H2>
				<List ordered>
					<ListItem>Install or invoke the Neon CLI and authenticate your account.</ListItem>
					<ListItem>From the repository root, run <InlineCode>npx neon@latest init</InlineCode> and link the new project.</ListItem>
					<ListItem>Review the target project and branch, then run <InlineCode>npx neon@latest deploy</InlineCode>.</ListItem>
				</List>
				<Paragraph>
				Managed Auth is available in AWS regions. Neon Auth does not currently support projects
				with IP Allow or Private Networking enabled.
				</Paragraph>
			</section>

			<section>
				<H2>Environment variables</H2>
				<Paragraph>
				Copy <InlineCode>.env.example</InlineCode> to <InlineCode>.env</InlineCode> and use the
				values for the linked branch:
				</Paragraph>
				<List>
					<ListItem><InlineCode>DATABASE_URL</InlineCode>: Neon Postgres connection URL.</ListItem>
					<ListItem><InlineCode>NEON_AUTH_BASE_URL</InlineCode>: Auth URL shown in the branch's Auth configuration.</ListItem>
					<ListItem><InlineCode>NEON_AUTH_COOKIE_SECRET</InlineCode>: generate locally with <InlineCode>openssl rand -base64 32</InlineCode>.</ListItem>
				</List>
				<Paragraph>
				The cookie secret must be at least 32 characters. Keep <InlineCode>.env</InlineCode> private;
				never commit credentials or reuse this project's values in another app.
				</Paragraph>
			</section>

			<section>
				<H2>Magic-link sign-in</H2>
				<Paragraph>
					Enable the Magic Link plugin for each branch in Neon Console under Auth → Plugins. Keep
					registration enabled if new users should be able to sign up by requesting a link. For a
					magic-link-only app, disable email/password authentication.
				</Paragraph>
				<H3>Production branches</H3>
				<Paragraph>
					Add the production origin to trusted domains, configure a dedicated SMTP provider, and
					disable localhost access. Auth users and settings belong to their Neon branch, so verify
					the branch when testing.
				</Paragraph>
			</section>
		</div>
	);
}