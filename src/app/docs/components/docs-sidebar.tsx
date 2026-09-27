"use client";

import Link from "next/link";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import type { DocMetadata } from "../types";

import styles from "../layout.module.css";

type DocsSidebarProps = {
	docs: DocMetadata[];
	currentSlug: string;
};

export default function DocsSidebar({ docs, currentSlug }: DocsSidebarProps) {
	const [query, setQuery] = useState("");
	const normalizedQuery = query.trim().toLowerCase();
	const matchingDocs = docs.filter((doc) =>
		`${doc.title} ${doc.description} ${doc.slug} ${doc.section}`.toLowerCase().includes(normalizedQuery),
	);
	const sections = [...new Set(matchingDocs.map((doc) => doc.section))];

	return (
		<aside className={styles.sidebar}>
			<Link href="/docs" className={styles.brand}>
				<span className={styles.brandMark} aria-hidden="true">n</span>
				<span>Project docs</span>
			</Link>
			<div className={styles.searchForm}>
				<label className="sr-only" htmlFor="docs-search">Search documentation</label>
				<Input
					id="docs-search"
					className={styles.searchInput}
					placeholder="Search docs"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<span className={styles.searchHint} aria-hidden="true">/</span>
			</div>
			<nav aria-label="Documentation">
				{sections.length > 0 ? sections.map((section) => (
					<div key={section}>
						<h2 className={styles.sectionTitle}>{section}</h2>
						<ul className={styles.navList}>
							{matchingDocs.filter((doc) => doc.section === section).map((doc) => (
								<li key={doc.slug}>
									<Link
										href={`/docs/${doc.slug}`}
										aria-current={doc.slug === currentSlug ? "page" : undefined}
										className={`${styles.navLink} ${doc.slug === currentSlug ? styles.navLinkActive : ""}`}
									>
										{doc.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)) : <p className={styles.emptySearch}>No matching pages.</p>}
			</nav>
		</aside>
	);
}