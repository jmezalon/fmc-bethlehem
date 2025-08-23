# FMCB

A modern Next.js 14 application built with TypeScript, Tailwind CSS, and internationalization support.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** components
- 🌍 **next-intl** for internationalization (English/Spanish)
- 📝 **React Hook Form** with **Zod** validation
- 🎯 **TypeScript** for type safety
- 🔧 **ESLint + Prettier** for code quality
- 📱 **Responsive design** with custom container component
- 🔍 **SEO optimized** with metadata configuration

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fmc-bethlehem/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   │       └── container.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── i18n.ts
│   └── middleware.ts
├── messages/
│   ├── en.json
│   └── es.json
├── components.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Internationalization

The app supports English (`en`) and Spanish (`es`) locales. Add translations in the `messages/` directory.

## Path Aliases

- `@/*` maps to `src/*` for cleaner imports

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other Next.js-compatible platform.
