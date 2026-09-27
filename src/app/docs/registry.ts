import GettingStartedPage, { docMetadata as gettingStartedMetadata } from "./content/getting-started";
import NeonPage, { docMetadata as neonMetadata } from "./content/neon";
import UiConventionsPage, { docMetadata as uiConventionsMetadata } from "./content/ui-conventions";
import type { DocModule, RegisteredDoc } from "./types";

const modules: DocModule[] = [
	{ docMetadata: gettingStartedMetadata, default: GettingStartedPage },
	{ docMetadata: neonMetadata, default: NeonPage },
	{ docMetadata: uiConventionsMetadata, default: UiConventionsPage },
];

const slugs = new Set<string>();

export const docs: RegisteredDoc[] = modules
	.map(({ docMetadata, default: Page }) => {
		if (slugs.has(docMetadata.slug)) throw new Error(`Duplicate docs slug: ${docMetadata.slug}`);
		slugs.add(docMetadata.slug);
		return { ...docMetadata, Page };
	})
	.sort((left, right) =>
		left.section.localeCompare(right.section) ||
		left.order - right.order ||
		left.title.localeCompare(right.title),
	);

export function findDoc(slug: string) {
	return docs.find((doc) => doc.slug === slug);
}
