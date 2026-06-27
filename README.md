# Crwn Clothing <img src="public/crwn-192x192.png" width="30" />

A modern, full-stack e-commerce application built as the **capstone project** of the Udemy course  
[**Complete React Developer (with Redux, Hooks, GraphQL, ContextAPI)**](https://www.udemy.com/share/101WH43@SPjKVsMgyPO1Uz0HoNsVXekhpxGzweLpaNS_qHji2_dLf77YzZOSTHfwiMFkZ4u_Rw==/) by Zero To Mastery.

This project demonstrates proficiency in modern React development, including state management with Redux, routing with React Router, form handling, and integration with Firebase for authentication and real-time database operations. The app allows users to browse a collection of clothing items, add them to a cart, and manage their shopping experience in a responsive, user-friendly interface.

## Features

- Fully functional shop with categories (Hats, Jackets, Sneakers, Womens, Mens)
- Shopping cart with add/remove/update quantity
- Cart persistence across sessions (Redux Persist / `localStorage`)
- User authentication (email/password and Google sign-in) using Firebase Auth
- Responsive & mobile-first design
- Styled with Styled-Components
- Stripe checkout (test mode on `main`; simulated in the original course)

## Tech Stack

### Course (original)

- React 18 (Functional Components + Hooks)
- Redux Toolkit + Redux Persist
- React Router v6
- Firebase Authentication & Firestore
- Styled-Components
- Context API (for cart & user in earlier sections)

### Current (`main` branch)

- React 19 (Functional Components + Hooks)
- Next.js 15 (App Router)
- Redux + Redux Persist + Redux Saga
- TypeScript
- Firebase Authentication & Firestore
- Styled-Components
- Stripe (checkout via Next.js API route)
- Vitest + React Testing Library
- Node.js 22
- Deployed on Vercel

## Usage

- Browsing: Navigate to the shop section to view collections.
- Cart Management: Click "Add to Cart" on items. Access the cart dropdown from the header.
- Checkout: Proceed to checkout (Stripe test cards on `main`; simulated in the original course).
- Authentication: Use the sign-in/sign-up forms in the header to create or access an account.

## Getting Started (`main` branch)

**Requirements:** Node.js 22+ (see `.nvmrc`)

```bash
yarn install
yarn dev      # http://localhost:3000
yarn test     # 57 unit/integration tests
yarn build
```

## App Routes (`main` branch)

| Route | Description |
|---|---|
| `/` | Home / directory |
| `/shop` | Category previews |
| `/shop/[category]` | Category product grid |
| `/auth` | Sign in / sign up |
| `/checkout` | Cart review + Stripe payment |
| `/api/create-payment-intent` | Stripe payment intent (API route) |

## Repository Branches

### Course progression

These branches track the step-by-step Udemy build:

| Branch | Topic |
|---|---|
| `Context-Reducer` | React Context + useReducer |
| `React-Redux` | Redux fundamentals |
| `Redux-Thunk` | Async logic with thunks |
| `Redux-Saga` | Side effects with sagas |
| `Redux-Toolkit` | Redux Toolkit |
| `TypeScript` | TypeScript migration |
| `Serverless-Stripe` | Stripe + Netlify functions |
| `Context-Graphql` | GraphQL data fetching |
| `Context-Netlify` | Netlify deployment |
| `PWA-MediaQueries` | PWA manifest + responsive styles |
| `Performance-Optimization` | Code splitting & lazy loading |

### Post-course snapshots & migrations

| Branch | Description |
|---|---|
| `preserve/cra-baseline` | Create React App snapshot + pre-migration bug fixes |
| `feat/vite-migration` | Phase 1 complete (Vite + Vitest + Netlify) |
| `feat/nextjs-vercel` | Phase 2 complete (Next.js + Vercel) |
| `main` | Current production branch (Next.js + Vercel) |

## Post-Course Modernization

After completing the course, this project was modernized in two phases. The course baseline is preserved on the `preserve/cra-baseline` branch.

### Pre-migration fixes (`preserve/cra-baseline`)

Before Phase 1, several bugs and quality issues from the course capstone were addressed:

- Fixed stale Firestore snapshot after `createUserDocumentFromAuth`
- Collapsed sign-up into a single saga flow (removed redundant action chain)
- Wired `isLoading` and error clearing in the user reducer
- Moved cart mutation logic into the cart reducer
- Simplified category derived state and hardened the payment form
- Fixed Jest setup and missing test dependencies

### Phase 1: Create React App → Vite

- Replaced Create React App with **Vite** for faster local development and builds
- Migrated the test runner from **Jest to Vitest**
- Updated deployment for **Netlify** (`dist` output, Node.js 22)
- Replaced `typed-redux-saga` macros with standard `redux-saga` effects
- Added a Netlify serverless function for Stripe payment intents

### Phase 2: Vite → Next.js + Vercel

- Migrated to **Next.js 15** with the **App Router**
- Replaced React Router with file-based routing (`app/`)
- Moved Stripe payment intent creation to a **Next.js API route** (`/api/create-payment-intent`)
- Added a shared **Providers** shell (Redux, PersistGate, Stripe Elements)
- Deployed on **Vercel**
- Netlify builds are skipped via `netlify.toml` (deploys run on Vercel)

The `main` branch reflects the current Next.js + Vercel setup. Earlier migration work remains available on `feat/vite-migration` and `feat/nextjs-vercel`.

## Certificate

This project was completed as part of the Udemy course, earning the following certificate:
[**Udemy Certificate**](https://udemy-certificate.s3.amazonaws.com/image/UC-1868aa63-784a-4330-974a-44323eac2185.jpg)

## Contributing

Feel free to fork this repo and submit pull requests for improvements, bug fixes, or additional features.

## Crwn Clothing Live Demo

[<img src="public/Crwn Clothing.png" width="400" />](https://e-commerce-crwn-clothing.vercel.app)