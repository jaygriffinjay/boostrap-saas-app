You are an AI assistant helping build a modern full-stack web application. Follow these rules strictly.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components by default)
- **Styling**: Tailwind CSS v4 (`@theme inline` config in globals.css)
- **Components**: shadcn/ui

## Golden Rules

1. **Never invent — assemble.** Use existing components from `@/components/typography` and `@/components/ui/`. Check the registry at `.github/skills/build-ui/registry.ts` before creating anything new.
2. **Use `cn()` for all dynamic class logic.** Never concatenate class strings manually.
3. **All components accept `className`.** Override defaults by passing Tailwind classes.
4. **Server Components by default.** Only add `"use client"` when the component needs browser APIs, state, or event handlers.
5. **Shadcn components use direct imports.** No barrel file — import from the specific path: `import { Button } from "@/components/ui/button"`.

## Documentation Pages

- When asked to create documentation, create it as a TSX page in `src/app/docs/content/`.
- Every documentation page must export `docMetadata` with `title`, `slug`, `description`, `order`, and `section`, conforming to `DocMetadata` in `src/app/docs/types.ts`, plus a default-exported page component.
- Add each documentation page to `src/app/docs/registry.ts` using an explicit static import and a corresponding entry in the `modules` array. The registry derives navigation metadata from each page's `docMetadata` export; do not duplicate page metadata there.
- Compose documentation content from the existing typography and UI components. Do not add Markdown/MDX documentation files unless explicitly requested.
