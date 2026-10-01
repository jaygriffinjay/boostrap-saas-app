import { H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";
import type { DocMetadata } from "../types";

import styles from "../doc-content.module.css";

export const docMetadata = {
	title: "Biome and editor setup",
	slug: "biome",
	description: "Understand formatting, linting, editor diagnostics, and when to run project checks.",
	order: 4,
	section: "Development",
} satisfies DocMetadata;

export default function BiomeDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Biome is this project's formatter and linter. It is installed as a development dependency,
				so <InlineCode>npm ci</InlineCode> installs the locked version. Prettier is not a direct
				project dependency or part of the npm scripts. A Prettier extension installed in your editor
				can still run independently of the repository.
			</Paragraph>

			<section>
				<H2>What is already enabled?</H2>
				<Paragraph>
					<InlineCode>biome.jsonc</InlineCode> enables formatting, recommended lint rules, import
					organization, and JSX attribute sorting. It also enables a nursery rule that suggests
					Tailwind class ordering, including inside <InlineCode>cn</InlineCode>, <InlineCode>cva</InlineCode>,
					and <InlineCode>clsx</InlineCode>. CSS Modules and Tailwind directives are supported by
					the configured CSS parser. Biome respects the Git ignore file.
				</Paragraph>
				<Paragraph>
					Enabled means these features run when Biome is invoked, not that a background watcher
					is always running. The current <InlineCode>dev</InlineCode> and <InlineCode>build</InlineCode>
					scripts only run Next.js; they do not run Biome. No Biome pre-commit hook or GitHub Actions
					workflow is supplied by this starter.
				</Paragraph>
			</section>

			<section>
				<H2>Run checks from the terminal</H2>
				<List>
					<ListItem><InlineCode>npm run check</InlineCode> reports formatting, lint, and assist issues without editing files.</ListItem>
					<ListItem><InlineCode>npm run check:write</InlineCode> formats files and applies fixes classified as safe, including enabled assist actions. Review the diff afterward.</ListItem>
					<ListItem><InlineCode>npm run check:unsafe</InlineCode> also applies unsafe fixes that may change behavior. Use deliberately on a clean checkpoint and review every change.</ListItem>
					<ListItem><InlineCode>npx biome check src/app/docs/content/biome.tsx</InlineCode> checks just one file.</ListItem>
					<ListItem><InlineCode>npx biome format --write src/app/docs/content/biome.tsx</InlineCode> formats just that file without applying lint fixes.</ListItem>
				</List>
				<Paragraph>
					An existing file can have formatting or lint findings even when the app works. Fix findings
					in the area you are changing; keep broad formatting cleanups separate from feature work.
				</Paragraph>
			</section>

			<section>
				<H2>Optional VS Code integration</H2>
				<Paragraph>
					Install the official <Link href="https://marketplace.visualstudio.com/items?itemName=biomejs.biome">Biome extension</Link>
					, then open the repository root as your workspace. The extension provides live diagnostics
					for supported files while its language server is active. The npm package alone does not
					install or activate this editor integration.
				</Paragraph>
				<List ordered>
					<ListItem>Open a TSX file and run <InlineCode>Format Document With...</InlineCode> from the Command Palette.</ListItem>
					<ListItem>Choose <InlineCode>Configure Default Formatter...</InlineCode>, then Biome. Its formatter ID is <InlineCode>biomejs.biome</InlineCode>.</ListItem>
					<ListItem>Enable <InlineCode>editor.formatOnSave</InlineCode> in workspace settings if you want automatic formatting. Otherwise, use Format Document manually.</ListItem>
					<ListItem>Repeat formatter selection for other languages you use, such as TypeScript, JavaScript, JSON, and CSS. Language-specific user settings can override a general formatter setting.</ListItem>
				</List>
				<H3>Formatting versus automatic fixes</H3>
				<Paragraph>
					Format-on-save formats text; it does not mean every lint issue gets fixed. For optional
					fixes on explicit saves, set <InlineCode>source.fixAll.biome</InlineCode> and
					<InlineCode>source.organizeImports.biome</InlineCode> to <InlineCode>"explicit"</InlineCode>
					inside <InlineCode>editor.codeActionsOnSave</InlineCode>. Review these edits just as you
					would terminal fixes. These are suggested settings, not settings already enabled by this repository.
				</Paragraph>
				<H3>If nothing happens or another formatter runs</H3>
				<Paragraph>
					Check that the extension is enabled for this workspace, inspect the Biome Output channel,
					and check language-specific default formatter settings. A personal Prettier configuration
					can explain different behavior on another machine. Workspace settings currently only suppress
					unknown CSS at-rule and Tailwind canonical-class warnings; they do not enable Biome or
					disable its lint rules.
				</Paragraph>
			</section>

			<section>
				<H2>A practical checking routine</H2>
				<Paragraph>
					Use editor feedback while working, format on save if you like it, and run
					<InlineCode>npm run check</InlineCode> before a commit or pull request. Run
					<InlineCode>npm run typecheck</InlineCode> at meaningful TypeScript checkpoints and
					<InlineCode>npm run build</InlineCode> before deployment or after framework/configuration
					changes. Biome is not a replacement for TypeScript typechecking or testing the app.
				</Paragraph>
				<Paragraph>
					See the official <Link href="https://biomejs.dev/guides/getting-started/">Biome guide</Link>
					and <Link href="https://biomejs.dev/reference/vscode/">VS Code integration reference</Link>,
					or return to <Link href="/docs/development-workflow">Development workflow</Link>.
				</Paragraph>
			</section>
		</div>
	);
}