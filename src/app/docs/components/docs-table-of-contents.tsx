"use client";

import { useEffect, useState } from "react";

import styles from "../layout.module.css";

type TocHeading = {
	id: string;
	text: string;
	level: 2 | 3;
};

function createHeadingId(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, "")
		.replace(/\s+/g, "-");
}

export default function DocsTableOfContents({ containerId }: { containerId: string }) {
	const [headings, setHeadings] = useState<TocHeading[]>([]);

	useEffect(() => {
		const container = document.getElementById(containerId);
		if (!container) return;

		const usedIds = new Set<string>();
		const foundHeadings = Array.from(container.querySelectorAll<HTMLElement>("h2, h3"))
			.map((heading) => {
				const text = heading.textContent?.trim() ?? "";
				if (!text) return null;

				const baseId = heading.id || createHeadingId(text) || "section";
				let id = baseId;
				let suffix = 2;
				while (usedIds.has(id)) {
					id = `${baseId}-${suffix}`;
					suffix += 1;
				}
				usedIds.add(id);
				heading.id = id;

				return { id, text, level: heading.tagName === "H2" ? 2 as const : 3 as const };
			})
			.filter((heading): heading is TocHeading => heading !== null);

		setHeadings(foundHeadings);
	}, [containerId]);

	return (
		<aside className={styles.toc} aria-label="On this page">
			<p className={styles.tocTitle}>On this page</p>
			{headings.length > 0 ? (
				<ul className={styles.tocList}>
					{headings.map((heading) => (
						<li key={heading.id}>
							<a className={`${styles.tocLink} ${heading.level === 3 ? styles.tocSubLink : ""}`} href={`#${heading.id}`}>
								{heading.text}
							</a>
						</li>
					))}
				</ul>
			) : <p className={styles.tocEmpty}>No sections.</p>}
		</aside>
	);
}