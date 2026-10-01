import { InlineCode, List, ListItem, Paragraph } from "@/components/typography";
import styles from "../doc-content.module.css";
import type { DocMetadata } from "../types";

export const docMetadata = {
	title: "Homepage screenshots",
	slug: "screenshots",
	description: "Capture and maintain the homepage image displayed in the README.",
	order: 6,
	section: "Development",
} satisfies DocMetadata;

export default function ScreenshotsDoc() {
	return (
		<div className={styles.content}>
			<List ordered>
				<ListItem>
					Start the app with <InlineCode>npm run dev</InlineCode>.
				</ListItem>
				<ListItem>
					In another terminal, run <InlineCode>npm run screenshot</InlineCode>.
					It captures <InlineCode>http://localhost:3000</InlineCode>.
				</ListItem>
				<ListItem>
					Review and commit <InlineCode>assets/homepage.png</InlineCode>.
					Each run replaces this image, which is already linked in the README.
				</ListItem>
			</List>
			<Paragraph>
				Different port or deployed site? Pass its URL:{" "}
				<InlineCode>npm run screenshot -- http://localhost:3001</InlineCode>.
			</Paragraph>
			<Paragraph>
				Missing browser? Run{" "}
				<InlineCode>npx playwright install chromium</InlineCode> once, then retry.
			</Paragraph>
		</div>
	);
}