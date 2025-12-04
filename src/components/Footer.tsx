'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 px-8 text-center border-t border-white/5">
      {/* Logo Text */}
      <div className="font-bebas text-2xl tracking-wider mb-6">
        <span className="text-white">EXTREME</span>
        <span className="text-cyan italic">IBIZA</span>
      </div>
      
      {/* Links */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <Link href="#" className="text-sm text-gray hover:text-cyan transition-colors">
          {t('privacy')}
        </Link>
        <Link href="#" className="text-sm text-gray hover:text-cyan transition-colors">
          {t('terms')}
        </Link>
        <a 
          href="https://instagram.com/extreme.ibiza" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray hover:text-cyan transition-colors"
        >
          Instagram
        </a>
      </div>
      
      {/* Language Switcher */}
      <div className="mb-6">
        <LanguageSwitcher />
      </div>
      
      {/* Copyright */}
      <p className="text-xs text-gray">
        {t('copyright')}{' '}
        <a 
          href="https://hub-de.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan hover:underline"
        >
          {t('group')}
        </a>
      </p>
    </footer>
  );
}
