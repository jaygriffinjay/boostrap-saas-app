import { Bold, H2, H3, InlineCode, Link, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "UI conventions",
	slug: "ui-conventions",
	description: "Guidance for composing consistent pages with this project's typography, UI primitives, and styles.",
	order: 2,
	section: "Development",
} as const;

export default function UiConventionsDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Build interfaces by composing the shared components and theme rather than creating one-off
				versions of common UI. The <Link href="/docs/typography-gallery">Typography gallery</Link> shows
				the available text components and color pairings.
			</Paragraph>

			<section>
				<H2>Use the shared component set</H2>
				<Paragraph>
					Import text components from <InlineCode>@/components/typography</InlineCode> and UI primitives
					from their direct paths under <InlineCode>@/components/ui</InlineCode>. Check the installed
					components before building a duplicate; compose existing pieces and pass <InlineCode>className</InlineCode>
					for local variations.
				</Paragraph>
			</section>

			<section>
				<H2>Keep heading levels semantic</H2>
				<Paragraph>
					Choose heading levels by document structure, not by the size you want visually. Use one page-level
					<InlineCode>H1</InlineCode>, <InlineCode>H2</InlineCode> for major sections, and <InlineCode>H3</InlineCode>
					for subsections. The docs table of contents reads H2 and H3 headings, so make their text descriptive.
				</Paragraph>
				<H3>Use emphasis with intent</H3>
				<Paragraph>
					Use <Bold>bold</Bold> for short important phrases. Prefer inline code for identifiers and commands,
					and links for destinations. Avoid stacking several emphasis treatments on the same text without a
					clear reason.
				</Paragraph>
			</section>

			<section>
				<H2>Style with CSS modules</H2>
				<Paragraph>
					Keep page and component styling in co-located <InlineCode>.module.css</InlineCode> files. Start each
					module with <InlineCode>@reference</InlineCode> to <InlineCode>src/styles/globals.css</InlineCode>,
					then use semantic class names and <InlineCode>@apply</InlineCode>. Avoid inline utility strings in TSX.
				</Paragraph>
				<H3>Use theme tokens</H3>
				<Paragraph>
					Prefer semantic tokens such as background, foreground, main, and border over hard-coded colors.
					Check foreground/background contrast, especially when using chart accent colors for large surfaces.
				</Paragraph>
				<H3>Browse the component gallery</H3>
				<List>
					<ListItem>
						See <Link href="/docs/typography-gallery">Typography & color gallery</Link> for examples of the
						available typography components and theme pairings.
					</ListItem>
				</List>
			</section>
		</div>
	);
}