import { H2, H3, InlineCode, List, ListItem, Paragraph } from "@/components/typography";

import styles from "@/app/docs/doc-content.module.css";

export const docMetadata = {
	title: "UI conventions",
	slug: "ui-conventions",
	description: "Use the shared typography, UI primitives, and CSS module conventions.",
	order: 2,
	section: "Development",
} as const;

export default function UiConventionsDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Build new screens from the existing project components first. The goal is a consistent
				starting point, not a second design system beside the one already installed.
			</Paragraph>

			<section>
				<H2>Reuse components</H2>
				<List>
					<ListItem>Import shared text treatments from <InlineCode>@/components/typography</InlineCode>.</ListItem>
					<ListItem>Import shadcn primitives directly, such as <InlineCode>@/components/ui/button</InlineCode>.</ListItem>
					<ListItem>Use the existing Neobrutalism palette and tokens in <InlineCode>src/styles/globals.css</InlineCode>.</ListItem>
				</List>
			</section>

			<section>
				<H2>Style TSX with CSS modules</H2>
				<Paragraph>
					Components and pages under <InlineCode>src/</InlineCode> should not contain inline Tailwind
					class strings. Put semantic classes in a co-located <InlineCode>.module.css</InlineCode>
					file, add an <InlineCode>@reference</InlineCode> to the global stylesheet, and use
					<InlineCode>@apply</InlineCode> there.
				</Paragraph>
				<H3>Shared component APIs</H3>
				<Paragraph>
					Accept and forward <InlineCode>className</InlineCode> where a component is intended to be
					extensible. Use <InlineCode>cn()</InlineCode> when combining conditional classes or caller
					classes.
				</Paragraph>
			</section>
		</div>
	);
}