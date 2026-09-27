import { MagicLinkSignInPanel } from "@/components/auth/magic-link-sign-in-panel";
import styles from "./page.module.css";

export default function HomePage() {
	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<a aria-label="NeonTest home" className={styles.brand} href="/">
						<span className={styles.brandMark}>
							n
						</span>
						<span className={styles.brandName}>NeonTest</span>
					</a>
					<span className={styles.tagline}>
						A little space to try things out
					</span>
				</div>
			</header>

			<div className={styles.content}>
				<section className={styles.intro}>
					<p className={styles.eyebrow}>
						Welcome
					</p>
					<h1 className={styles.heading}>
						Good to have you here.
					</h1>
					<p className={styles.description}>
						This is your home base for the app. Sign in with a link sent to your
						inbox and you&apos;ll be right back where you left off.
					</p>
				</section>

				<MagicLinkSignInPanel />
			</div>
		</main>
	);
}
