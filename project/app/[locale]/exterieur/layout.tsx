import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extérieur - Les Étoiles du Rocher',
  description: 'Découvrez notre villa de luxe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
} 