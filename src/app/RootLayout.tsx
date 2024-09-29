import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { cn } from '@/utils/html';

import '@/styles/global.css';

const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Blink',
  description: 'Encurte seus links de forma simples e rápida.',
};

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={cn('antialiased', interFont.className)}>{children}</body>
    </html>
  );
}

export default RootLayout;
