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
	Text,
	Underline,
} from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "@/app/docs/doc-content.module.css";
import galleryStyles from "./typography-gallery.module.css";

export const docMetadata = {
	title: "Typography & color gallery",
	slug: "typography-gallery",
	description: "Browse shared typography components and theme color pairings.",
	order: 3,
	section: "Development",
} as const;

export default function TypographyGalleryDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				A visual gallery of the typography components and color tokens available in this project. For usage
				guidance, see <Link href="/docs/ui-conventions">UI conventions</Link>.
			</Paragraph>

			<section>
				<H2>Heading scale</H2>
				<div className={galleryStyles.headingGrid}>
					<Card className={galleryStyles.galleryCard}>
						<CardContent className={galleryStyles.galleryStack}>
							<div className={galleryStyles.headingSample}><Small>H1</Small><H1>Page title</H1></div>
							<div className={galleryStyles.headingSample}><Small>H2</Small><H2>Section heading</H2></div>
							<div className={galleryStyles.headingSample}><Small>H3</Small><H3>Subsection heading</H3></div>
							<div className={galleryStyles.headingSample}><Small>H4</Small><H4>Compact heading</H4></div>
							<div className={galleryStyles.headingSample}><Small>H5</Small><H5>Small heading</H5></div>
							<div className={galleryStyles.headingSample}><Small>H6</Small><H6>Fine heading</H6></div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section>
				<H2>Inline and block components</H2>
				<div className={galleryStyles.galleryGrid}>
					<Card className={galleryStyles.galleryCard}>
						<CardHeader><CardTitle>Emphasis</CardTitle></CardHeader>
						<CardContent className={galleryStyles.galleryStack}>
							<Paragraph>
								Try <Bold>bold</Bold>, <Italic>italic</Italic>, <Underline>underlined</Underline>,{" "}
								<Strikethrough>struck</Strikethrough>, and <Highlight>highlighted</Highlight> text.
							</Paragraph>
							<Paragraph>
								Inline code looks like <InlineCode>auth.getSession()</InlineCode>, and links render as{" "}
								<Link href="https://neon.tech">Neon</Link>.
							</Paragraph>
							<Paragraph><Text className={galleryStyles.textSample}>Text component with caller styling</Text></Paragraph>
						</CardContent>
					</Card>
					<Card className={galleryStyles.galleryCard}>
						<CardHeader><CardTitle>Block components</CardTitle></CardHeader>
						<CardContent className={galleryStyles.galleryStack}>
							<Blockquote>Good typography makes interface hierarchy easier to scan.</Blockquote>
							<List>
								<ListItem>Clear labels</ListItem>
								<ListItem>Readable supporting copy</ListItem>
								<ListItem>Consistent emphasis</ListItem>
							</List>
						</CardContent>
					</Card>
				</div>
			</section>

			<section>
				<H2>Theme color pairings</H2>
				<Paragraph>Compare real typography against semantic surfaces and accent tokens.</Paragraph>
				<div className={galleryStyles.colorGrid}>
					<article className={`${galleryStyles.colorSample} ${galleryStyles.mainSample}`}>
						<Small className={galleryStyles.sampleLabel}>Main / main foreground</Small>
						<H3 className={galleryStyles.sampleTitle}>A clear headline</H3>
						<Paragraph className={galleryStyles.sampleText}>Supporting copy with <Bold>strong emphasis</Bold> and <Underline className={galleryStyles.sampleUnderline}>an underline</Underline>.</Paragraph>
					</article>
					<article className={`${galleryStyles.colorSample} ${galleryStyles.backgroundSample}`}>
						<Small className={galleryStyles.sampleLabel}>Background / foreground</Small>
						<H3 className={galleryStyles.sampleTitle}>A quiet surface</H3>
						<Paragraph className={galleryStyles.sampleText}>Body text with <Highlight className={galleryStyles.sampleHighlight}>highlighted words</Highlight> and <InlineCode>inline code</InlineCode>.</Paragraph>
					</article>
					<article className={`${galleryStyles.colorSample} ${galleryStyles.yellowSample}`}>
						<Small className={galleryStyles.sampleLabel}>Chart 3 / foreground</Small>
						<H3 className={galleryStyles.sampleTitle}>A bright accent</H3>
						<Paragraph className={galleryStyles.sampleText}>Check smaller type against a saturated background.</Paragraph>
					</article>
					<article className={`${galleryStyles.colorSample} ${galleryStyles.greenSample}`}>
						<Small className={galleryStyles.sampleLabel}>Chart 4 / foreground</Small>
						<H3 className={galleryStyles.sampleTitle}>Another accent</H3>
						<Paragraph className={galleryStyles.sampleText}>Compare weight and readability on a second accent.</Paragraph>
					</article>
				</div>
			</section>
		</div>
	);
}
