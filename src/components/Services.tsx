'use client';

import {useTranslations} from 'next-intl';

const serviceIcons = {
  vipTables: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <circle cx="24" cy="12" r="8"/>
      <path d="M8 44 L16 24 L32 24 L40 44"/>
      <line x1="12" y1="44" x2="36" y2="44"/>
      <path d="M20 24 L20 16"/>
      <path d="M28 24 L28 16"/>
    </svg>
  ),
  villas: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M4 24 L24 8 L44 24"/>
      <rect x="8" y="24" width="32" height="18"/>
      <rect x="18" y="30" width="12" height="12"/>
      <rect x="12" y="28" width="6" height="6"/>
      <rect x="30" y="28" width="6" height="6"/>
      <line x1="24" y1="8" x2="24" y2="4"/>
      <circle cx="24" cy="4" r="2"/>
    </svg>
  ),
  yachts: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M4 32 Q12 28 24 28 Q36 28 44 32"/>
      <path d="M8 32 L12 20 L24 8 L24 28"/>
      <path d="M24 14 L38 26 L38 32"/>
      <path d="M2 36 Q8 34 16 36 Q24 38 32 36 Q40 34 46 36"/>
      <line x1="24" y1="8" x2="24" y2="4"/>
      <path d="M22 4 L26 4"/>
    </svg>
  ),
  supercars: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M6 28 L10 20 L18 18 L30 18 L38 20 L42 28 L42 32 L6 32 Z"/>
      <circle cx="14" cy="32" r="4"/>
      <circle cx="34" cy="32" r="4"/>
      <line x1="18" y1="24" x2="30" y2="24"/>
      <path d="M10 24 L14 24"/>
      <path d="M34 24 L38 24"/>
      <path d="M18 18 L20 12 L28 12 L30 18"/>
    </svg>
  ),
  transfers: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <rect x="4" y="16" width="40" height="20" rx="4"/>
      <circle cx="12" cy="36" r="4"/>
      <circle cx="36" cy="36" r="4"/>
      <rect x="8" y="20" width="8" height="6" rx="1"/>
      <rect x="18" y="20" width="8" height="6" rx="1"/>
      <rect x="28" y="20" width="8" height="6" rx="1"/>
      <line x1="4" y1="28" x2="44" y2="28"/>
      <path d="M38 16 L40 12 L44 12"/>
    </svg>
  ),
  security: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M24 4 L40 10 L40 22 C40 32 32 40 24 44 C16 40 8 32 8 22 L8 10 Z"/>
      <path d="M24 14 L24 28"/>
      <circle cx="24" cy="20" r="4"/>
      <path d="M18 26 L24 32 L30 26"/>
    </svg>
  ),
  dining: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <ellipse cx="24" cy="32" rx="18" ry="8"/>
      <path d="M6 32 L6 28 Q6 20 24 20 Q42 20 42 28 L42 32"/>
      <path d="M24 20 L24 8"/>
      <circle cx="24" cy="6" r="3"/>
      <path d="M14 26 Q24 22 34 26"/>
    </svg>
  ),
  jets: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M24 4 L24 44"/>
      <path d="M8 20 L24 14 L40 20"/>
      <path d="M12 38 L24 34 L36 38"/>
      <circle cx="24" cy="10" r="3"/>
      <path d="M20 24 L28 24"/>
    </svg>
  ),
};

const services = [
  { key: 'vipTables', icon: serviceIcons.vipTables },
  { key: 'villas', icon: serviceIcons.villas },
  { key: 'yachts', icon: serviceIcons.yachts },
  { key: 'supercars', icon: serviceIcons.supercars },
  { key: 'transfers', icon: serviceIcons.transfers },
  { key: 'security', icon: serviceIcons.security },
  { key: 'dining', icon: serviceIcons.dining },
  { key: 'jets', icon: serviceIcons.jets },
];

export default function Services() {
  const t = useTranslations('services');

  const handleServiceClick = (serviceKey: string) => {
    const event = new CustomEvent('openChat', { detail: { service: serviceKey } });
    window.dispatchEvent(event);
  };

  return (
    <section id="services" className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-center mb-16 tracking-wider">
        {t('title')} <span className="text-cyan">{t('premium')}</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.key}
            onClick={() => handleServiceClick(service.key)}
            className="service-card group bg-dark border border-white/5 p-8 md:p-10 text-center cursor-pointer"
          >
            <div className="service-icon mb-6 flex justify-center">
              {service.icon}
            </div>
            <h3 className="font-bebas text-lg md:text-xl tracking-widest mb-3">
              {t(`${service.key}.title`)}
            </h3>
            <p className="text-xs md:text-sm text-gray font-light leading-relaxed">
              {t(`${service.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
