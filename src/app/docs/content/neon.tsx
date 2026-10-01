import { H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

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
				Use a separate Neon project for a new app, or select the existing app's project when
				setting up another checkout. Cloning this repository copies the integration code, not
				the database or users. Run the following commands from the repository root.
			</Paragraph>

			<section>
				<H2>Authenticate and link this checkout</H2>
				<List ordered>
					<ListItem>If no local env file exists, copy <InlineCode>.env.example</InlineCode> to <InlineCode>.env</InlineCode> first. Do not copy the blank example over CLI-populated values later.</ListItem>
					<ListItem>Run <InlineCode>npx neon@latest login</InlineCode> and complete the browser login to your Neon account. This authenticates the CLI, not an app user.</ListItem>
					<ListItem>Run <InlineCode>npx neon@latest link --no-config</InlineCode>. Select the organization, create/select the correct project, and select the intended branch. The template already includes <InlineCode>neon.ts</InlineCode>, so no new config is needed.</ListItem>
				</List>
				<Paragraph>
					Linking records the target in the locally ignored <InlineCode>.neon</InlineCode> file and
					pulls branch variables by default. If you copied the folder rather than cloning it, check
					for an old local context and credentials before running commands. CLI commands can also
					find a parent directory's <InlineCode>.neon</InlineCode> context; verify the selected project.
				</Paragraph>
				<H3>Where does neon init fit?</H3>
				<Paragraph>
					The original starter was set up with <InlineCode>npx neon@latest init</InlineCode>. That
					is a broader onboarding command: it can set up agent skills/MCP, link a project, and
					scaffold config. For this existing template, use <InlineCode>npx neon@latest init --no-config</InlineCode>
					instead of the link step if you also want that agent setup. You do not need to run both.
					MCP and agent skills are optional developer tooling, not requirements for app login.
				</Paragraph>
			</section>

			<section>
				<H2>Provision the declared services</H2>
				<Paragraph>
					The checked-in <InlineCode>neon.ts</InlineCode> declares <InlineCode>auth: true</InlineCode>.
					On a fresh project, review the linked target and run <InlineCode>npx neon@latest deploy</InlineCode>
					to apply that policy. This changes Neon resources and pulls their variables; it does not
					deploy the Next.js website or apply your Drizzle schema. Do not recreate services already
					configured on an existing app's branch just because you cloned the code.
				</Paragraph>
				<Paragraph>
					Managed Auth requires an AWS region and does not support IP Allow or Private Networking.
					Choose a suitable project rather than disabling existing network protections. The branch
					policy in this template also gives newly created non-default branches a seven-day TTL;
					review that before creating long-lived staging environments.
				</Paragraph>
				<Paragraph>
					Check Auth with <InlineCode>npx neon@latest neon-auth status</InlineCode>. If you enabled
					Auth through the Console, you can pull its variables with
					<InlineCode>npx neon@latest env pull --file .env</InlineCode> without deploying again.
					Auth service status is not confirmation that the Magic Link plugin is enabled.
				</Paragraph>
			</section>

			<section>
				<H2>Environment variables</H2>
				<Paragraph>
					Keep the values from the selected branch in <InlineCode>.env</InlineCode>.
					<InlineCode>src/env.js</InlineCode> requires these three values at app startup/build:
				</Paragraph>
				<List>
					<ListItem><InlineCode>DATABASE_URL</InlineCode>: Neon Postgres connection URL, normally pooled for the web app.</ListItem>
					<ListItem><InlineCode>NEON_AUTH_BASE_URL</InlineCode>: the branch's full Auth URL from Auth configuration, including its database/auth path. This is not the Postgres URL or the JWKS URL.</ListItem>
					<ListItem><InlineCode>NEON_AUTH_COOKIE_SECRET</InlineCode>: generate locally with <InlineCode>openssl rand -base64 32</InlineCode>.</ListItem>
				</List>
				<Paragraph>
					The cookie secret is app-managed; generate it yourself and put it on its own line as
					<InlineCode>NEON_AUTH_COOKIE_SECRET="your-generated-value"</InlineCode>. Keep the entire
					Base64 output, including the trailing equals sign. It must be at least 32 characters;
					do not use the placeholder or prefix it with <InlineCode>NEXT_PUBLIC_</InlineCode>.
					Generate once for a local setup, not every startup. Use a separate secret for a new app,
					and share a consistent secret across instances of the same deployed environment.
				</Paragraph>
				<Paragraph>
					The example also lists <InlineCode>DATABASE_URL_UNPOOLED</InlineCode>, <InlineCode>NEON_BRANCH</InlineCode>,
					and <InlineCode>NEON_AUTH_JWKS_URL</InlineCode>. These can be populated by Neon, but the
					app currently only validates/reads the three required values above. In particular,
					Drizzle Kit currently reads <InlineCode>DATABASE_URL</InlineCode>; adding the unpooled
					variable alone does not switch its connection.
				</Paragraph>
				<Paragraph>
					Neon updates its managed variables and preserves other lines when pulling env. It targets
					an existing <InlineCode>.env</InlineCode>, otherwise <InlineCode>.env.local</InlineCode>.
					Avoid conflicting duplicates: Next.js gives local env files precedence over
					<InlineCode>.env</InlineCode>. Restart the dev server after changing values, keep credentials
					out of Git, and do not use <InlineCode>SKIP_ENV_VALIDATION</InlineCode> to hide missing setup.
				</Paragraph>
			</section>

			<section>
				<H2>Magic-link sign-in</H2>
				<Paragraph>
					On the selected branch, open Auth → Plugins and enable Magic Link. Enable Allow New User
					Registration if a fresh email address should be able to create an account. For genuinely
					magic-link-only auth, also disable email/password and remove unwanted OAuth providers,
					including any shared Google provider. Hiding their buttons in the app does not disable
					those authentication methods on the service.
				</Paragraph>
				<Paragraph>
					Shared SMTP is sufficient for development magic-link delivery; no separate app mailer is
					required. Confirm localhost access is allowed for the development branch. Start the app,
					request a fresh link, and open it in the same browser. The flow is homepage, email link,
					<InlineCode>/auth/callback</InlineCode>, then <InlineCode>/dashboard</InlineCode>. Check
					reloading, signing out, and visiting the dashboard while signed out. Do not share email
					links or session-verifier URLs; they carry temporary sign-in credentials.
				</Paragraph>
				<H3>Production branches</H3>
				<Paragraph>
					Add the production origin to trusted domains, configure a dedicated SMTP provider, and
					disable localhost access. Auth users and settings belong to their Neon branch, so verify
					the branch when testing.
				</Paragraph>
			</section>

			<section>
				<H2>Troubleshooting a fresh checkout</H2>
				<List>
					<ListItem>Invalid environment variables: check the three required names, blank values, cookie-secret length, and conflicting local env files.</ListItem>
					<ListItem>No Auth URL: confirm Auth exists on the selected branch, then pull env again or use the Console's Auth configuration URL.</ListItem>
					<ListItem>No magic link: check the plugin toggle, registration setting, spam folder, and email delivery limits on the correct branch.</ListItem>
					<ListItem>Redirect/domain errors: use the actual app origin and port. Allow localhost for development and register deployed origins as trusted domains.</ListItem>
					<ListItem>Link returns to login: request a fresh link from this app, open it in the same browser, and verify the Auth URL matches the intended branch. Keep the public callback route available to finish the session exchange.</ListItem>
				</List>
				<Paragraph>
					Official references: <Link href="https://neon.com/docs/cli/init">init</Link>,{" "}
					<Link href="https://neon.com/docs/cli/link">link</Link>,{" "}
					<Link href="https://neon.com/docs/cli/env">environment variables</Link>,{" "}
					<Link href="https://neon.com/docs/auth/guides/plugins/magic-link">Magic Link</Link>, and{" "}
					<Link href="https://neon.com/docs/auth/production-checklist">production readiness</Link>.
					For application tables rather than Auth provisioning, see <Link href="/docs/database">Database</Link>.
				</Paragraph>
			</section>
		</div>
	);
}