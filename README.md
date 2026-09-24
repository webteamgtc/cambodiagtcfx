# GTC FX - Next.js with i18n

Next.js 15 project with **App Router** and **internationalization (en / ar)**. Metadata (title, description) and page content are loaded from JSON translation files.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/en` or `/ar` based on your browser language.

## Structure

- **`src/app/[locale]/`** – All routes are under a locale segment (`/en`, `/ar`).
- **`src/messages/`** – `en.json` and `ar.json` for translations (metadata + page copy).
- **`src/i18n/`** – `config.ts` (locales, RTL), `request.ts` (`getDictionary(locale)`).
- **`src/middleware.ts`** – Redirects `/` to `/en` or `/ar` using `Accept-Language`.

## Features

- **Metadata i18n**: `generateMetadata` in layout and about page uses translated title/description from JSON.
- **Dummy pages**: Home (`/en`, `/ar`) and About (`/en/about`, `/ar/about`) with translated text.
- **RTL**: Arabic uses `dir="rtl"` and right-aligned layout.
- **Language switch**: Header links to switch between English and Arabic.

## Adding translations

1. Add keys to `src/messages/en.json` and `src/messages/ar.json`.
2. In a Server Component: `const dict = await getDictionary(locale);` and use `dict.yourKey`.
3. For metadata: use the same `dict.metadata.*` (or a dedicated section) in `generateMetadata`.
