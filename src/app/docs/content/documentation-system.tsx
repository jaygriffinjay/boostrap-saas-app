import { H2, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import contentStyles from "@/app/docs/doc-content.module.css";
import styles from "./documentation-system.module.css";

export const docMetadata = {
	title: "This documentation site itself",
	slug: "documentation-system",
	description: "How the internal docs routes, content pages, registry, styles, and table of contents fit together.",
	order: 2,
	section: "Development",
} as const;

const folderTree = `src/app/docs/
+-- [...slug]/page.tsx             Dynamic page route
+-- components/
|   +-- docs-sidebar.tsx           Sectioned navigation and search
|   +-- docs-table-of-contents.tsx Scans rendered H2/H3 headings
+-- content/
|   +-- getting-started.tsx        Documentation page + docMetadata
|   +-- neon.tsx                   Documentation page + docMetadata
|   +-- ui-conventions.tsx         Documentation page + docMetadata
|   +-- typography-gallery.tsx     Documentation page + local CSS module
|   +-- typography-gallery.module.css
+-- doc-content.module.css         Shared article layout and heading styles
+-- layout.module.css              Docs shell and navigation layout
+-- page.tsx                       Redirects /docs to its default page
+-- registry.ts                    Explicit page imports and derived metadata
+-- types.ts                       Shared metadata and registry types`;

export default function DocumentationSystemPage() {
	return (
		<div className={contentStyles.content}>
			<Paragraph>
				The internal docs are ordinary React Server Component pages. Each content page owns its metadata
				and renders with the same typography and UI components used elsewhere in the project.
			</Paragraph>

			<section>
				<H2>Folder structure</H2>
				<Paragraph>
					All docs routing, navigation, content, and styling live together under{" "}
					<InlineCode>src/app/docs</InlineCode>.
				</Paragraph>
				<pre className={styles.folderTree}><code>{folderTree}</code></pre>
			</section>

			<section>
				<H2>Document metadata</H2>
				<Paragraph>
					Every page in <InlineCode>content/</InlineCode> exports a <InlineCode>docMetadata</InlineCode>
					object and a default page component. The metadata contract is defined by{" "}
					<InlineCode>DocMetadata</InlineCode> in <InlineCode>types.ts</InlineCode>:
				</Paragraph>
				<List>
					<ListItem><InlineCode>title</InlineCode> is the page heading and navigation label.</ListItem>
					<ListItem><InlineCode>slug</InlineCode> determines the URL under <InlineCode>/docs/</InlineCode>.</ListItem>
					<ListItem><InlineCode>description</InlineCode> is used for page metadata and summaries.</ListItem>
					<ListItem><InlineCode>section</InlineCode> groups pages in the left navigation.</ListItem>
					<ListItem><InlineCode>order</InlineCode> sorts pages within a section.</ListItem>
				</List>
			</section>

			<section>
				<H2>Route and registry</H2>
				<Paragraph>
					<InlineCode>[...slug]/page.tsx</InlineCode> looks up the URL slug in <InlineCode>registry.ts</InlineCode>,
					then renders the matching page. The registry uses explicit static imports so Next can bundle
					each TSX page; it reads navigation metadata from each page's export instead of copying it.
				</Paragraph>
				<Paragraph>
					When adding a document, create it in <InlineCode>content/</InlineCode>, export the required
					metadata and default component, then add its import and module entry to <InlineCode>registry.ts</InlineCode>.
					The registry sorts entries by section, order, and title and rejects duplicate slugs.
				</Paragraph>
			</section>

			<section>
				<H2>Table of contents and styling</H2>
				<Paragraph>
					The right-side table of contents scans the rendered article for H2 and H3 headings and links
					to their page anchors; headings do not need separate TOC metadata. The shared article module
					provides common spacing and heading behavior. A page that needs custom presentation can keep
					a co-located CSS module in <InlineCode>content/</InlineCode>, like the{" "}
					<Link href="/docs/typography-gallery">typography gallery</Link>.
				</Paragraph>
			</section>
		</div>
	);
}
