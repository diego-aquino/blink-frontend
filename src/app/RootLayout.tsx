import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { cn } from '@/utils/html';

import '@/styles/global.css';
import RootProvider from './providers/RootProvider';

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
      <body
        className={cn('flex h-full min-h-screen flex-col bg-slate-100 text-slate-800 antialiased', interFont.className)}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export default RootLayout;
