# Neontest Boilerplate

A reusable Next.js starter with Neon Postgres, Neon Managed Auth, email magic-link sign-in, Drizzle ORM, Tailwind CSS v4, shadcn/ui, and shared typography components.

## Stack

- Next.js 16 App Router and React 19
- Neon Postgres with Drizzle ORM and `postgres.js`
- Neon Managed Auth with a passwordless magic-link sign-in flow
- Tailwind CSS v4, shadcn/ui, and Neobrutalism components
- TypeScript, Zod environment validation, and Biome

## Requirements

- Node.js 20.19 or newer
- npm 11 (the repository's package manager is recorded in `package.json`)
- A Neon account and the Neon CLI for provisioning/linking a project

## Start a New App

Use a separate Neon project for each app created from this boilerplate. Do not reuse this repository's project URL, branch credentials, or local `.env` values.

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create or select a Neon project in the AWS region you want to use. Managed Auth is currently available in AWS regions and does not support projects with IP Allow or Private Networking enabled.

3. Link this checkout to that project and apply the checked-in Neon configuration:

   ```bash
   npx neon@latest init
   npx neon@latest deploy
   ```

   `neon.ts` declares Managed Auth and a seven-day TTL for newly created non-default branches. `neon deploy` applies that configuration to the linked branch. Review the proposed project/branch before applying it. The `.neon` link file is ignored by Git and should be created separately in each checkout.

4. Copy `.env.example` to `.env`, then set the values for the linked project's branch:

   ```env
   DATABASE_URL="your-neon-postgres-connection-url"
   NEON_AUTH_BASE_URL="your-branch-auth-base-url"
   NEON_AUTH_COOKIE_SECRET="your-generated-secret"
   ```

   Neon may populate branch-injected variables when deploying its config. Confirm that `DATABASE_URL` and `NEON_AUTH_BASE_URL` point to the intended branch. Generate a fresh cookie secret locally:

   ```bash
   openssl rand -base64 32
   ```

   Keep the complete output, including any trailing `=`, in `.env`. The secret must be at least 32 characters. Never commit `.env` or share its secret. `src/env.js` validates the three required variables when Next.js loads the app. `DATABASE_URL_UNPOOLED`, `NEON_BRANCH`, and `NEON_AUTH_JWKS_URL` are optional CLI-provided values and are not read by the app currently.

5. In the Neon Console, open the linked branch's **Auth → Plugins** and enable **Magic Link**. Allow new-user registration if users should be able to create accounts by requesting a link. This project is intended to use magic links only; disable email/password if it is enabled on the branch.

6. Start the app:

   ```bash
   npm run dev
   ```

   Open the URL printed by Next.js. The home page sends a magic link; the callback establishes the session; `/dashboard` requires sign-in. `/dev/typography` is a development-only page for reviewing shared typography components and also requires sign-in.

## Authentication

- `src/lib/auth/server.ts` creates the Neon server auth instance.
- `src/lib/auth/client.ts` creates the browser auth client.
- `src/app/api/auth/[...path]/route.ts` forwards auth API requests.
- `src/app/auth/callback/page.tsx` exchanges the one-time session verifier before navigating to the dashboard.
- `proxy.ts` protects dashboard routes, and the dashboard checks the server session before rendering.

Magic Link is a Neon branch setting as well as an app integration. Each development, preview, or production branch has its own Auth configuration and users. For production, register the app's origin under Auth trusted domains, configure a dedicated SMTP provider, and disable localhost access on the production branch. See [Neon's Managed Auth docs](https://neon.com/docs/auth/overview), [Magic Link guide](https://neon.com/docs/auth/guides/plugins/magic-link), and [production checklist](https://neon.com/docs/auth/production-checklist).

## Database

The Drizzle schema is in `src/server/db/schema.ts`; the database client is in `src/server/db/index.ts`. Tables use the `neontest_` prefix.

- `npm run db:generate` generates migration files from schema changes.
- `npm run db:migrate` applies generated migrations to the database configured by `DATABASE_URL`.
- `npm run db:push` directly synchronizes the schema and is convenient for local prototyping. Use reviewed migrations for shared or production databases.
- `npm run db:studio` opens Drizzle Studio.

Before running a database command, make sure `.env` targets the intended Neon project and branch.

## UI Conventions

- Reuse exports from `src/components/typography` and primitives from `src/components/ui` before creating new UI.
- Import shadcn components from their direct paths, for example `@/components/ui/button`.
- Keep page and component styling in co-located CSS modules. Modules use Tailwind `@apply` and start with `@reference` to `src/styles/globals.css`; JSX uses `styles.className` rather than inline Tailwind class strings.
- Shared Tailwind theme tokens and global styles live in `src/styles/globals.css`.
- shadcn registry settings are in `components.json`.

Repository-specific Copilot guidance is in `.github/copilot-instructions.md`; file-specific TSX and CSS module rules are in `.github/instructions/`.

## Checks

```bash
npm run check
npm run typecheck
npm run build
```

Run checks at meaningful checkpoints, such as after completing a feature or before deploying, rather than after every small edit.

## Deployment Notes

Set the three required environment variables in the deployment platform's secret/environment settings. Use a production Neon branch and matching `NEON_AUTH_BASE_URL`; add the production origin to Neon Auth trusted domains. Configure SMTP and turn off localhost access before opening the app to production users.
