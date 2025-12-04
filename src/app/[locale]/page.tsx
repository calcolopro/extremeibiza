import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Difference from '@/components/Difference';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'meta'});
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: 'https://extremeibiza.es',
    },
  };
}

export default function HomePage() {
  return (
    <>
      <div className="bg-glow" />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Difference />
        <Contact />
        <Footer />
      </main>
      <ChatButton />
    </>
  );
}
