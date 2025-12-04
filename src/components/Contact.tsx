'use client';

import {useTranslations} from 'next-intl';

const WHATSAPP_NUMBER = '34600470136';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 px-8 text-center">
      <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mb-12 tracking-wider">
        {t('title')}
      </h2>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <button
          onClick={() => {
            const event = new CustomEvent('openChat');
            window.dispatchEvent(event);
          }}
          className="px-8 py-4 font-bebas text-xl tracking-wider bg-cyan border-2 border-cyan text-black hover:bg-transparent hover:text-cyan transition-all duration-300"
        >
          {t('startPlanning')}
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 font-bebas text-xl tracking-wider bg-[#25D366] border-2 border-[#25D366] text-black hover:bg-transparent hover:text-[#25D366] transition-all duration-300"
        >
          {t('directWhatsApp')}
        </a>
      </div>
      
      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-12 text-sm text-gray">
        <div>
          <strong className="text-white">{t('email')}</strong>
          <br />
          <a 
            href="mailto:info@extremeibiza.es" 
            className="hover:text-cyan transition-colors"
          >
            info@extremeibiza.es
          </a>
        </div>
        <div>
          <strong className="text-white">{t('booking')}</strong>
          <br />
          <a 
            href="mailto:booking@extremeibiza.es" 
            className="hover:text-cyan transition-colors"
          >
            booking@extremeibiza.es
          </a>
        </div>
        <div>
          <strong className="text-white">{t('location')}</strong>
          <br />
          <span>Ibiza, Spain</span>
        </div>
      </div>
    </section>
  );
}
