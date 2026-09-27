"use client";

import { useState, type FormEvent } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import styles from "./auth.module.css";

export function MagicLinkSignInPanel() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isSending, setIsSending] = useState(false);

	async function requestMagicLink(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setMessage("");
		setIsSending(true);

		try {
			const { error: signInError } = await authClient.signIn.magicLink({
				email,
				callbackURL: "/auth/callback",
			});

			if (signInError) {
				setError(signInError.message || "We couldn't send the sign-in link.");
				return;
			}

			setMessage(`Check ${email} for your sign-in link.`);
		} catch {
			setError("We couldn't reach the sign-in service. Please try again.");
		} finally {
			setIsSending(false);
		}
	}

	return (
		<Card className={styles.panel}>
			<CardHeader className={styles.panelHeader}>
				<p className={styles.panelEyebrow}>
					Sign in to continue
				</p>
				<CardTitle className={styles.panelTitle}>Get a sign-in link</CardTitle>
				<CardDescription className={styles.panelDescription}>
					We&apos;ll email you a secure link. No password needed.
				</CardDescription>
			</CardHeader>

			<CardContent className={styles.panelContent}>
				<form className={styles.form} onSubmit={requestMagicLink}>
					<Label className={styles.label} htmlFor="email">
						Email address
					</Label>
					<Input
						autoComplete="email"
						className={styles.input}
						id="email"
						required
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<Button
						className={styles.submitButton}
						disabled={isSending}
						type="submit"
					>
						{isSending ? "Sending link..." : "Email me a sign-in link"}
						<span aria-hidden="true">↗</span>
					</Button>
				</form>

				{message && (
					<Alert className={styles.message}>
						<AlertDescription>{message}</AlertDescription>
					</Alert>
				)}
				{error && (
					<Alert className={styles.error} variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
			</CardContent>

			<CardFooter className={styles.panelFooter}>
				<p className={styles.footnote}>
					Sign-in links expire after a short time and can only be used once.
				</p>
			</CardFooter>
		</Card>
	);
}