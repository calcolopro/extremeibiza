'use client';

import {useTranslations} from 'next-intl';

export default function Difference() {
  const t = useTranslations('difference');

  return (
    <section className="py-24 px-8 text-center bg-gradient-to-b from-transparent via-dark to-transparent">
      {/* Badge */}
      <div className="inline-block border border-cyan px-6 py-2 mb-8">
        <span className="font-bebas text-sm tracking-[0.2em] text-cyan">
          {t('badge')}
        </span>
      </div>
      
      {/* Quote */}
      <p className="font-bebas text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto mb-4 leading-relaxed tracking-wide">
        {t('quote').split('llaves').map((part, i, arr) => (
          <span key={i}>
            {i === 0 ? part : ''}
            {i < arr.length - 1 && (
              <span className="text-cyan">llaves{arr.length > 1 ? '' : ''}</span>
            )}
            {i > 0 ? part : ''}
          </span>
        ))}
      </p>
      
      <p className="font-bebas text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8 leading-relaxed tracking-wide text-gray-light">
        {t('subquote')}
      </p>
      
      {/* Description */}
      <p className="text-base text-gray font-light max-w-2xl mx-auto leading-relaxed">
        {t('text')}
      </p>
    </section>
  );
}
