import { H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "Development workflow",
	slug: "development-workflow",
	description: "Common project scripts, validation checkpoints, and internal docs conventions.",
	order: 3,
	section: "Development",
} as const;

export default function DevelopmentWorkflowDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				This page collects the recurring commands and repository conventions for day-to-day work.
				For the visual component rules, see <Link href="/docs/ui-conventions">UI conventions</Link>.
			</Paragraph>

			<section>
				<H2>Useful commands</H2>
				<List>
					<ListItem><InlineCode>npm run dev</InlineCode> starts the Next.js development server.</ListItem>
					<ListItem><InlineCode>npm run check</InlineCode> runs Biome checks.</ListItem>
					<ListItem><InlineCode>npm run typecheck</InlineCode> runs the TypeScript compiler without emitting files.</ListItem>
					<ListItem><InlineCode>npm run build</InlineCode> creates a production build.</ListItem>
					<ListItem><InlineCode>npm run record:demo</InlineCode> opens the local app in a headed browser and records a manual walkthrough. Press Enter in the terminal to save the WebM under the ignored <InlineCode>recordings/</InlineCode> directory.</ListItem>
				</List>
			</section>

			<section>
				<H2>Adding an internal documentation page</H2>
				<H3>Page metadata and registration</H3>
				<Paragraph>
					Create a Server Component TSX page in <InlineCode>src/app/docs/content/</InlineCode>. Export
					<InlineCode>docMetadata</InlineCode> with <InlineCode>title</InlineCode>, <InlineCode>slug</InlineCode>,{" "}
					<InlineCode>description</InlineCode>, <InlineCode>order</InlineCode>, and <InlineCode>section</InlineCode>, then
					add a static import and module entry to <InlineCode>src/app/docs/registry.ts</InlineCode>. The
					registry reads navigation metadata from each page export; do not duplicate it in the registry.
				</Paragraph>
				<Paragraph>
					Compose content from the shared typography and UI components. The docs layout derives its
					right-side table of contents from rendered H2 and H3 headings.
				</Paragraph>
			</section>
		</div>
	);
}
