import { redirect } from "next/navigation";

import { docs } from "./registry";

export default function DocsIndexPage() {
	redirect(`/docs/${docs[0]?.slug ?? "getting-started"}`);
}