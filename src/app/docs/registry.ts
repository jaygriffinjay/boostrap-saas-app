import DatabasePage, { docMetadata as databaseMetadata } from "./content/database";
import DevelopmentWorkflowPage, { docMetadata as developmentWorkflowMetadata } from "./content/development-workflow";
import DocumentationSystemPage, { docMetadata as documentationSystemMetadata } from "./content/documentation-system";
import GettingStartedPage, { docMetadata as gettingStartedMetadata } from "./content/getting-started";
import NeonPage, { docMetadata as neonMetadata } from "./content/neon";
import TypographyDebugPage, { docMetadata as typographyDebugMetadata } from "./content/typography-debug";
import TypographyGalleryPage, { docMetadata as typographyGalleryMetadata } from "./content/typography-gallery";
import UiConventionsPage, { docMetadata as uiConventionsMetadata } from "./content/ui-conventions";
import type { DocModule, RegisteredDoc } from "./types";

const modules: DocModule[] = [
	{ docMetadata: databaseMetadata, default: DatabasePage },
	{ docMetadata: developmentWorkflowMetadata, default: DevelopmentWorkflowPage },
	{ docMetadata: documentationSystemMetadata, default: DocumentationSystemPage },
	{ docMetadata: gettingStartedMetadata, default: GettingStartedPage },
	{ docMetadata: neonMetadata, default: NeonPage },
	{ docMetadata: typographyDebugMetadata, default: TypographyDebugPage },
	{ docMetadata: typographyGalleryMetadata, default: TypographyGalleryPage },
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
