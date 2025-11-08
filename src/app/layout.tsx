import type { Metadata } from 'next';
import { locales } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Migration Portal - Your Journey to a Better Future',
  description:
    'Expert guidance for immigration, work permits, and study abroad opportunities. We make your migration dreams a reality.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
