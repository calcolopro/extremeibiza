import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import {Bebas_Neue, Outfit} from 'next/font/google';
import '../globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export function generateStaticParams() {
  return [{locale: 'es'}, {locale: 'en'}];
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${bebas.variable} ${outfit.variable}`}>
      <body className="font-outfit">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
