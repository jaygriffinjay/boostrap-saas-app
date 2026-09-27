import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { H1, Paragraph } from "@/components/typography";
import { docs, findDoc } from "../registry";
import type { DocMetadata } from "../types";

import DocsSidebar from "../components/docs-sidebar";
import DocsTableOfContents from "../components/docs-table-of-contents";
import styles from "../layout.module.css";

type DocsPageProps = {
	params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
	return docs.map(({ slug }) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
	const { slug } = await params;
	const doc = findDoc(slug.join("/"));
	if (!doc) return {};
	return { title: `${doc.title} | Project Docs`, description: doc.description };
}

export default async function DocsPage({ params }: DocsPageProps) {
	const { slug } = await params;
	const doc = findDoc(slug.join("/"));
	if (!doc) notFound();

	const navigationDocs: DocMetadata[] = docs.map(({ Page: _Page, ...metadata }) => metadata);
	const Page = doc.Page;

	return (
		<div className={styles.shell}>
			<DocsSidebar docs={navigationDocs} currentSlug={doc.slug} />
			<main className={styles.articleColumn}>
				<header className={styles.articleHeader}>
					<p className={styles.sectionLabel}>{doc.section}</p>
					<H1 className={styles.title}>{doc.title}</H1>
					<Paragraph className={styles.description}>{doc.description}</Paragraph>
				</header>
				<article className={styles.article} id="docs-article">
					<Page />
				</article>
			</main>
			<DocsTableOfContents containerId="docs-article" />
		</div>
	);
}