# My Journey - Human Migration Website

A modern, minimal migration portal website built with Next.js, Tailwind CSS, and shadcn/ui. This portal allows users to apply for meetings with the company by submitting their contact information and skills.

## Features

- ✨ Modern minimal dark-themed design
- 🌍 Multi-language support (English & Bangla)
- 🌓 Dark/Light mode toggle
- 🎨 Animated hero section with gradient background
- 📝 Comprehensive application form with validation
- 📱 Fully responsive design
- ⚡ Built with Next.js 14+ App Router
- 🎯 Type-safe with TypeScript
- 🎭 Smooth animations with Framer Motion
- ✅ Form validation with React Hook Form & Zod

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Running

The dependencies are already installed. Simply start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
my-journey/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── apply/          # Application form page
│   │   │   └── layout.tsx      # Locale layout with providers
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx      # Navigation with language/theme switchers
│   │   │   ├── Footer.tsx      # Footer with links
│   │   │   └── Container.tsx   # Content container
│   │   ├── sections/           # Page sections
│   │   │   ├── HeroSection.tsx         # Animated hero section
│   │   │   └── ServicesSection.tsx     # Services overview
│   │   ├── forms/              # Form components
│   │   │   └── ApplicationForm.tsx     # Main application form
│   │   ├── animations/         # Animation components
│   │   │   └── AnimatedBackground.tsx  # Hero background animation
│   │   ├── shared/             # Shared components
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── theme-provider.tsx
│   │   └── ui/                 # shadcn/ui components
│   ├── i18n/                   # Internationalization config
│   │   ├── config.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations/        # Form validation schemas
│   │       └── application.ts
│   └── middleware.ts           # i18n middleware
├── messages/                   # Translation files
│   ├── en.json                 # English translations
│   └── bn.json                 # Bangla translations
└── public/                     # Static assets
```

## Available Pages

- **Home** (`/`): Hero section with animated background, services overview
- **Apply** (`/apply`): Application form page with full validation

### Planned Pages

- **About** (`/about`): About the company
- **Services** (`/services`): Detailed services information
- **Contact** (`/contact`): Contact information
- **FAQ** (`/faq`): Frequently asked questions

## Key Features

### Multi-language Support

The website supports both English and Bangla. Users can switch languages using the globe icon in the header. All content is fully translated.

### Dark/Light Mode

The website defaults to dark mode and supports:
- Light mode
- Dark mode
- System preference

Toggle between modes using the sun/moon icon in the header.

### Application Form

The comprehensive form includes:
- **Personal Information**: name, email, phone, DOB, nationality, location
- **Professional Information**: education, field of study, experience, occupation, skills
- **Migration Details**: destination, purpose, timeline, additional info
- Full form validation with Zod
- Error messages in both languages
- Loading states during submission

### Animated Background

The hero section features:
- Animated gradient background
- Floating orbs with smooth animations
- Geometric grid pattern overlay
- Theme-aware colors

## Customization

### Adding Translations

1. Add new keys to `messages/en.json`
2. Add corresponding translations to `messages/bn.json`
3. Use in components:

```tsx
const t = useTranslations('yourKey');
return <p>{t('yourSubKey')}</p>;
```

### Changing Colors

Update the color scheme in `src/app/globals.css`:
- Light mode colors in `:root`
- Dark mode colors in `.dark`

### Adding Pages

1. Create a new directory in `src/app/[locale]/`
2. Add a `page.tsx` file
3. Import and use the layout components (Header, Footer)

## Backend Integration

The form is ready for API integration. Update the endpoint in `src/components/forms/ApplicationForm.tsx`:

```typescript
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## Next Steps

- [ ] Create About, Services, Contact, and FAQ pages
- [ ] Add testimonials section
- [ ] Implement actual API integration
- [ ] Add SEO meta tags for all pages
- [ ] Optimize images
- [ ] Add analytics

---

Built with Next.js, Tailwind CSS, and shadcn/ui.
# migration
