import './globals.css';

export const metadata = {
  title: 'ExtremeIbiza | Luxury Concierge Services',
  description: 'Premium concierge services in Ibiza. VIP tables, luxury villas, yacht charters, supercars, and bespoke experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
