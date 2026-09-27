import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth/server";

import { signOut } from "./actions";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const { data: session } = await auth.getSession();

	if (!session?.user) redirect("/");
	const displayName = session.user.name || session.user.email;
	const initials = displayName
		.split(/[\s@._-]+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");

	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<a className={styles.brand} href="/" aria-label="Neontest home">
						<span className={styles.brandMark} aria-hidden="true">n</span>
						<span className={styles.brandName}>Neontest</span>
					</a>
					<form action={signOut}>
						<Button type="submit" variant="neutral" size="sm">
							<LogOut aria-hidden="true" />
							Sign out
						</Button>
					</form>
				</div>
			</header>

			<div className={styles.content}>
				<section className={styles.welcome}>
					<Badge variant="neutral">Your workspace</Badge>
					<h1 className={styles.heading}>Welcome, {displayName}.</h1>
					<p className={styles.description}>
						You’re signed in. This is your private space, ready for what you build next.
					</p>
				</section>

				<Card className={styles.accountCard}>
					<CardHeader className={styles.accountHeader}>
						<Avatar className={styles.avatar} aria-hidden="true">
							<AvatarFallback>{initials || "N"}</AvatarFallback>
						</Avatar>
						<div className={styles.accountHeading}>
							<CardTitle className={styles.accountTitle}>Your account</CardTitle>
							<CardDescription className={styles.accountDescription}>
								Signed in with a secure email link
							</CardDescription>
						</div>
						<Badge className={styles.status} variant="default">Active</Badge>
					</CardHeader>
					<CardContent className={styles.accountContent}>
						<dl className={styles.emailRow}>
							<dt className={styles.emailLabel}>Email</dt>
							<dd className={styles.emailValue}>{session.user.email}</dd>
						</dl>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}