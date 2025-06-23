// app/layout.tsx
import '@/styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Afthonios',
  description: 'Bilinguale Trainingsplattform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}