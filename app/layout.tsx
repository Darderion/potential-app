import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Item Selector',
  description: 'Select items and see chances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}