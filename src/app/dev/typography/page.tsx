import { notFound, redirect } from "next/navigation";

import {
	Blockquote,
	Bold,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Highlight,
	InlineCode,
	Italic,
	Link,
	List,
	ListItem,
	Paragraph,
	Small,
	Strikethrough,
	Underline,
} from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/env";
import { auth } from "@/lib/auth/server";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function TypographyTestPage() {
	if (env.NODE_ENV === "production") notFound();

	const { data: session } = await auth.getSession();
	if (!session?.user) redirect("/");

	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<p className={styles.eyebrow}>Development only</p>
				<H1 className={styles.title}>Typography specimens</H1>
				<Paragraph className={styles.intro}>
					A quick visual check of the shared typography components. Signed in as {session.user.email}.
				</Paragraph>
			</header>

			<div className={styles.grid}>
				<Card className={styles.specimen}>
					<CardHeader>
						<CardTitle>Headings</CardTitle>
					</CardHeader>
					<CardContent className={styles.stack}>
						<H1>Heading one</H1>
						<H2>Heading two</H2>
						<H3>Heading three</H3>
						<H4>Heading four</H4>
						<H5>Heading five</H5>
						<H6>Heading six</H6>
					</CardContent>
				</Card>

				<Card className={styles.specimen}>
					<CardHeader>
						<CardTitle>Inline treatments</CardTitle>
					</CardHeader>
					<CardContent className={styles.stack}>
						<Paragraph>
							Try <Bold>bold text</Bold>, <Italic>italic text</Italic>, <Underline>underlined text</Underline>,
							 <Strikethrough>struck text</Strikethrough>, and <Highlight>highlighted text</Highlight>.
						</Paragraph>
						<Paragraph>
							Inline code looks like <InlineCode>auth.getSession()</InlineCode>, and links render as{" "}
							<Link href="https://neon.tech">Neon</Link>.
						</Paragraph>
						<Small>Small supporting text</Small>
					</CardContent>
				</Card>

				<Card className={styles.specimen}>
					<CardHeader>
						<CardTitle>Blocks and lists</CardTitle>
					</CardHeader>
					<CardContent className={styles.stack}>
						<Blockquote>
							Good typography makes the hierarchy of an interface easier to scan.
						</Blockquote>
						<List>
							<ListItem>Clear labels</ListItem>
							<ListItem>Readable supporting copy</ListItem>
							<ListItem>Consistent emphasis</ListItem>
						</List>
					</CardContent>
				</Card>
			</div>

			<section className={styles.colorSection}>
				<H2 className={styles.colorHeading}>Color combinations</H2>
				<Paragraph className={styles.colorIntro}>
					Preview typography against the semantic and accent colors from the active theme.
				</Paragraph>
				<div className={styles.colorGrid}>
					<article className={`${styles.colorSample} ${styles.mainSample}`}>
						<Small className={styles.sampleLabel}>Main / main foreground</Small>
						<H3 className={styles.sampleTitle}>A clear headline</H3>
						<Paragraph className={styles.sampleText}>
							Readable supporting copy with <Bold>strong emphasis</Bold> and{" "}
							<Underline className={styles.sampleUnderline}>a colored underline</Underline>.
						</Paragraph>
					</article>
					<article className={`${styles.colorSample} ${styles.backgroundSample}`}>
						<Small className={styles.sampleLabel}>Background / foreground</Small>
						<H3 className={styles.sampleTitle}>A quiet surface</H3>
						<Paragraph className={styles.sampleText}>
							Body text with <Highlight className={styles.sampleHighlight}>highlighted words</Highlight> and{" "}
							<InlineCode>inline code</InlineCode>.
						</Paragraph>
					</article>
					<article className={`${styles.colorSample} ${styles.yellowSample}`}>
						<Small className={styles.sampleLabel}>Chart 3 / foreground</Small>
						<H3 className={styles.sampleTitle}>A bright accent</H3>
						<Paragraph className={styles.sampleText}>
							Check smaller type and emphasis against a saturated background.
						</Paragraph>
					</article>
					<article className={`${styles.colorSample} ${styles.greenSample}`}>
						<Small className={styles.sampleLabel}>Chart 4 / foreground</Small>
						<H3 className={styles.sampleTitle}>Another accent</H3>
						<Paragraph className={styles.sampleText}>
							A second palette pairing for comparing weight and readability.
						</Paragraph>
					</article>
				</div>
			</section>
		</main>
	);
}