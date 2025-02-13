import { TranslationProvider } from '@/context/TranslationContext';
import './globals.css';

export const metadata = {
  title: 'Jovanka & Mladen - Wedding Invitation',
  description: 'Wedding invitation for Jovanka and Mladen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
