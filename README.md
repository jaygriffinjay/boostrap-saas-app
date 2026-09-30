# Boostrap SaaS App

A personal starter for Next.js 16, Neon Postgres and Managed Auth, Drizzle ORM, Tailwind CSS v4, and shadcn/Neobrutalism UI.

The project keeps its working notes in the internal docs site. Start the app with `npm run dev`, then open the `/docs` route.

## Internal docs

- [Getting started](http://localhost:3000/docs/getting-started): prerequisites and first-run setup.
- [Neon setup](http://localhost:3000/docs/neon): Neon project, environment variables, magic-link Auth, and production setup.
- [Database](http://localhost:3000/docs/database): Drizzle schema, connection, and database commands.
- [Development workflow](http://localhost:3000/docs/development-workflow): scripts, checks, routes, and how to add docs.
- [UI conventions](http://localhost:3000/docs/ui-conventions): shared typography, shadcn primitives, and CSS modules.

## Main routes

- `/`: email magic-link sign-in.
- `/dashboard`: authenticated user dashboard.
- `/docs`: internal project documentation.
- `/dev/typography`: signed-in, non-production typography specimen page.

For fresh-project setup, follow [Getting started](http://localhost:3000/docs/getting-started) rather than copying credentials from this checkout. Each app should use its own Neon project and local environment values.
