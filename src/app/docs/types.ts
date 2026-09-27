import type { ComponentType } from "react";

export type DocMetadata = {
	title: string;
	slug: string;
	description: string;
	order: number;
	section: string;
};

export type DocModule = {
	docMetadata: DocMetadata;
	default: ComponentType;
};

export type RegisteredDoc = DocMetadata & {
	Page: ComponentType;
};