import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";

import { H1, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/button";
import styles from "./not-found.module.css";

export default function NotFound() {
	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<NextLink aria-label="NeonTest home" className={styles.brand} href="/">
						<span className={styles.brandMark}>n</span>
						<span className={styles.brandName}>NeonTest</span>
					</NextLink>
				</div>
			</header>
			<section className={styles.notFoundContent}>
				<Paragraph className={styles.errorCode}>404</Paragraph>
				<H1 className={styles.heading}>Page not found.</H1>
				<Paragraph className={styles.description}>
					This page may have moved, or it might not be available here.
				</Paragraph>
				<Button
					className={styles.homeLink}
					nativeButton={false}
					render={<NextLink href="/" />}
				>
					<ArrowLeft aria-hidden="true" />
					Back to home
				</Button>
			</section>
		</main>
	);
}