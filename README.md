# Crwn Clothing <img src="public/crwn-192x192.png" width="30" alt="" />

Modern full-stack e-commerce demo — shop collections, cart, Firebase auth, and Stripe **test-mode** checkout.

**Live demo:** [e-commerce-crwn-clothing.vercel.app](https://e-commerce-crwn-clothing.vercel.app)

[![Crwn Clothing responsive demo — desktop and mobile views](public/Crwn%20Clothing.png)](https://e-commerce-crwn-clothing.vercel.app)

Originally the capstone from [Complete React Developer](https://zerotomastery.io/courses/learn-react/) (Zero To Mastery / Udemy). The `main` branch is a post-course modernization to **Next.js 15 + TypeScript + Vercel**.

> **Demo only.** Use Stripe **test** keys (`pk_test_` / `sk_test_`). Do not process live charges with this project. Never commit `.env` or real secrets.

## Features

- Shop by category (Hats, Jackets, Sneakers, Womens, Mens)
- Cart with quantity controls and `localStorage` persistence
- Email/password and Google sign-in (Firebase Auth)
- Stripe test checkout (guest or signed-in)
- Server-side cart pricing and order confirmation
- Responsive UI (styled-components)

## Tech stack (`main`)

- Next.js 15 (App Router) · React 19 · TypeScript
- Redux + Redux Persist + Redux Saga
- Firebase Auth & Firestore
- Stripe (Next.js API routes)
- Vitest + React Testing Library · Playwright (e2e)
- Node.js 22+ · Vercel

## Quick start

```bash
cp .env.example .env   # add Firebase + Stripe values
yarn install
yarn dev               # http://localhost:3000
yarn test
yarn build
```

| Script | Purpose |
|--------|---------|
| `yarn dev` / `yarn dev:clean` | Dev server (clean clears `.next`) |
| `yarn test` / `yarn test:e2e` | Unit + e2e tests |
| `yarn build` / `yarn start` | Production build / serve |
| `yarn smoke:checkout` | Production checkout smoke (needs local `.env`) |
| `yarn deploy:firestore-rules` | Deploy `firestore.rules` (project id from `.env`) |

### Environment variables

Copy [`.env.example`](.env.example) to `.env` and fill in your values.

| Variable | Scope | Notes |
|----------|--------|--------|
| `NEXT_PUBLIC_FIREBASE_*` | Public | Web client config |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | `pk_test_…` |
| `STRIPE_SECRET_KEY` | Server | `sk_test_…` |
| `FIREBASE_CLIENT_EMAIL` | Server | Service account email |
| `FIREBASE_PRIVATE_KEY` | Server | Service account PEM (`\n` newlines; no extra quotes on Vercel) |

Never prefix server secrets with `NEXT_PUBLIC_`. Restrict the Firebase web API key with HTTP referrers in Google Cloud Console (localhost + your deploy domain).

### Stripe test card

1. Add items → `/checkout`
2. Card: `4242 4242 4242 4242` · any future expiry · any CVC/ZIP  
3. Success → `/checkout/success?saved=true`

More cards: [Stripe testing](https://docs.stripe.com/testing#cards).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/shop`, `/shop/[category]`, `/shop/[category]/[productId]` | Catalog |
| `/auth` | Sign in / sign up |
| `/checkout`, `/checkout/success` | Cart + payment |
| `/api/create-payment-intent` | Create Stripe PaymentIntent |
| `/api/save-order` | Confirm order after payment |

## Course history & branches

Step-by-step Udemy branches (Context, Redux, Saga, Toolkit, TypeScript, Stripe, GraphQL, PWA, etc.) remain in the repo for reference. Snapshots:

| Branch | Notes |
|--------|--------|
| `preserve/cra-baseline` | Create React App baseline |
| `feat/vite-migration` | Vite + Vitest era |
| `feat/nextjs-vercel` | Next.js migration work |
| **`main`** | Current production (Next.js + Vercel) |

Post-course work included CRA bugfixes, Vite migration, then Next.js App Router, API routes for payments/orders, and Vercel deploy.

## Certificate

[Udemy Certificate](https://udemy-certificate.s3.amazonaws.com/image/UC-1868aa63-784a-4330-974a-44323eac2185.jpg)

## License

[MIT](./LICENSE)

## Contributing

Forks and PRs for fixes or small improvements are welcome.
