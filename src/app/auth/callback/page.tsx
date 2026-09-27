"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth/client";

export default function AuthCallbackPage() {
	const router = useRouter();
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;

		async function finishSignIn() {
			const { data, error: sessionError } = await authClient.getSession();

			if (cancelled) return;
			if (sessionError || !data?.user) {
				setError(sessionError?.message ?? "The sign-in link could not be verified.");
				return;
			}

			router.replace("/dashboard");
		}

		void finishSignIn();
		return () => {
			cancelled = true;
		};
	}, [router]);

	return (
		<main className="flex min-h-screen items-center justify-center bg-[#f5f7f4] px-5 py-12 text-[#172522]">
			<section aria-live="polite" className="w-full max-w-md border border-[#d6dfda] bg-white p-8 shadow-[0_24px_70px_-42px_rgba(23,37,34,0.35)]">
				<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#55776b]">
					Passwordless sign in
				</p>
				<h1 className="mt-3 text-2xl font-semibold">
					{error ? "Sign-in link not accepted" : "Finishing sign in..."}
				</h1>
				{error && <p className="mt-3 text-sm leading-6 text-[#8c3023]">{error}</p>}
				{error && (
					<a className="mt-5 inline-flex border border-[#cbd6d0] px-3 py-2 text-sm font-medium hover:bg-[#f5f7f4]" href="/">
						Request another link
					</a>
				)}
			</section>
		</main>
	);
}