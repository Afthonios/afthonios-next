// app/[locale]/layout.tsx
import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import '@styles/globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}