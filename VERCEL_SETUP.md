# Vercel Setup

This monorepo is ready to be deployed as 3 separate Vercel projects.

## Projects

- `raketech-admin` -> `apps/admin`
- `raketech-storefront-digital` -> `apps/storefront-digital`
- `raketech-storefront-physical` -> `apps/storefront-physical`

## Vercel Dashboard Steps

1. Go to Vercel and select `Add New -> Project`.
2. Import the GitHub repo `Roiner994/raketech`.
3. Set the `Root Directory` for each project:
   - `apps/admin`
   - `apps/storefront-digital`
   - `apps/storefront-physical`
4. Keep the default Next.js framework detection.
5. Set the production branch to `main`.
6. Repeat until all 3 app directories are connected.

## Environment Variables

Copy the same Firebase values into all 3 projects:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Notes

- The repo uses npm workspaces, so Vercel can build each app independently.
- The UI package is shared through `@raketech/ui` and is already configured for transpilation in each app.
- No additional `vercel.json` file is required for the current setup.
