'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative">
      {/* Logo Text */}
      <div className="mb-8 animate-fade-in-up">
        <div className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wide">
          <span className="text-white">EXTREME</span>
          <span className="text-cyan italic">IBIZA</span>
        </div>
      </div>
      
      {/* Tagline */}
      <p className="text-sm md:text-lg font-light text-gray tracking-[0.3em] uppercase mb-12 animate-fade-in-up-delay-1">
        {t('tagline')}
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up-delay-2">
        <button 
          onClick={() => {
            const event = new CustomEvent('openChat');
            window.dispatchEvent(event);
          }}
          className="px-8 py-4 font-bebas text-xl tracking-wider bg-cyan border-2 border-cyan text-black hover:bg-transparent hover:text-cyan transition-all duration-300"
        >
          {t('cta')}
        </button>
        <Link 
          href="#services"
          className="px-6 py-4 font-bebas text-lg tracking-wider bg-transparent border border-gray text-gray hover:border-white hover:text-white transition-all duration-300"
        >
          {t('viewServices')}
        </Link>
      </div>
      
      {/* Hero Line */}
      <div className="hero-line mt-12 mb-6 animate-fade-in-up-delay-3" />
      
      {/* Scroll hint */}
      <span className="text-xs tracking-[0.3em] text-gray uppercase animate-pulse-slow">
        {t('scroll')}
      </span>
    </section>
  );
}
