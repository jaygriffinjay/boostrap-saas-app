import {
	Bold,
	H2,
	H3,
	Highlight,
	InlineCode,
	Italic,
	Link,
	Paragraph,
	Strikethrough,
	Underline,
} from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "./typography-debug.module.css";

export const docMetadata = {
	title: "Typography stress test",
	slug: "typography-debug",
	description: "Stress-test inline typography, wrapping, punctuation, and nested treatments.",
	order: 1,
	section: "Debugging",
} as const;

export default function TypographyDebugDoc() {
	return (
		<div className={styles.content}>
			<Paragraph>
				Intentionally awkward examples for checking how typography components behave in real prose.
			</Paragraph>

			<section>
				<H2>Long inline code</H2>
				<Paragraph>
					This sentence has a long unbroken identifier in the middle: <InlineCode>createNeonAuthServerWithCookieSecretAndBranchScopedConfigurationAndAutomaticallyValidateEveryEnvironmentVariableBeforeStartingTheApplicationInDevelopmentAndProduction</InlineCode> and should continue naturally afterward without pushing the page wider.
				</Paragraph>
				<Card className={styles.narrowCard}>
					<CardHeader><CardTitle>Narrow container</CardTitle></CardHeader>
					<CardContent>
						<Paragraph>
							<InlineCode>superLongUnbrokenTokenNameForTestingInlineCodeOverflowBehaviorAtSmallWidthsWithoutAnyNaturalBreakPointsSoTheBrowserMustDecideHowToWrapOrClipThisEntireSequenceOfCharacters</InlineCode>
						</Paragraph>
					</CardContent>
				</Card>
			</section>

			<section>
				<H2>Punctuation and spacing</H2>
				<Paragraph>
					Check punctuation after code: <InlineCode>config.auth</InlineCode>, then parentheses (<InlineCode>getSession()</InlineCode>), a colon: <InlineCode>required</InlineCode>; and sentence-ending punctuation <InlineCode>done</InlineCode>.
				</Paragraph>
				<Paragraph>
					Adjacent components: <InlineCode>first</InlineCode><InlineCode>second</InlineCode><Bold>bold</Bold><Link href="/docs">link</Link>.
				</Paragraph>
			</section>

			<section>
				<H2>Nested treatments</H2>
				<div className={styles.examples}>
					<Paragraph>
						<Bold>Bold containing <Italic>italic with <InlineCode>nestedCode()</InlineCode></Italic> and trailing bold.</Bold>
					</Paragraph>
					<Paragraph>
						<Highlight>Highlight around ordinary text and <InlineCode>highlightedCode</InlineCode>.</Highlight>
					</Paragraph>
					<Paragraph>
						<Underline>Underline around <Bold>bold</Bold>, <Italic>italic</Italic>, and <InlineCode>underlinedCode</InlineCode>.</Underline>
					</Paragraph>
					<Paragraph>
						<Link href="/docs/typography-gallery">A link wrapping <Bold>bold text</Bold> and <InlineCode>linkCode</InlineCode></Link>, followed by normal text.
					</Paragraph>
					<Paragraph>
						<Strikethrough>Struck text with <InlineCode>deprecatedOption</InlineCode> and nested <Bold>bold</Bold>.</Strikethrough>
					</Paragraph>
				</div>
			</section>

			<section>
				<H2>Heading and line-wrap pressure</H2>
				<div className={styles.narrowCard}>
					<H3>Long heading with code <InlineCode>extraordinarilyLongHeadingIdentifierThatMayWrap</InlineCode></H3>
					<Paragraph>
						A deliberately narrow text column combines regular copy, <InlineCode>longUnbrokenInlineContentThatNeedsToWrapCorrectlyAcrossMultipleVisualLinesWithoutCausingHorizontalOverflowOrCoveringThePunctuationImmediatelyAfterTheInlineCodeElement</InlineCode>, and more words after it so we can inspect both the inline box and the surrounding line layout.
					</Paragraph>
				</div>
			</section>
		</div>
	);
}
