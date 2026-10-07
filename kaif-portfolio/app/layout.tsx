import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Kaif — Full Stack AI Engineer',
  description: 'Full Stack AI Engineer in Faisalabad. Next.js, FastAPI, LLM pipelines and automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
