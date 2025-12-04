'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

const locales = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (locales.some(l => l.code === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => switchLocale('es')}
        className={`text-sm px-2 py-1 transition-all duration-300 ${
          locale === 'es' ? 'text-cyan' : 'text-gray hover:text-white'
        }`}
      >
        ES
      </button>
      <span className="text-gray">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`text-sm px-2 py-1 transition-all duration-300 ${
          locale === 'en' ? 'text-cyan' : 'text-gray hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
