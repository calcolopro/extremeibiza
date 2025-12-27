'use client';

const services = [
  { key: 'vipTables', title: 'VIP Tables', description: 'Priority access to Pacha, Amnesia, Ushuaïa, Hï Ibiza and all top venues' },
  { key: 'villas', title: 'Luxury Villas', description: 'Exclusive properties with direct access. Sea views, pools, privacy' },
  { key: 'yachts', title: 'Yacht Charters', description: 'Day cruises, sunset sails, Formentera trips. All sizes available' },
  { key: 'supercars', title: 'Supercar Hire', description: 'Ferrari, Lamborghini, Porsche, Bentley, Rolls-Royce and more' },
  { key: 'transfers', title: 'Private Transfers', description: 'Mercedes V-Class, shuttle service, airport pickups' },
  { key: 'security', title: 'Personal Security', description: 'Professional protection. Discreet, experienced, 24/7' },
  { key: 'dining', title: 'Private Dining', description: 'Personal chefs, exclusive reservations, beach setups' },
  { key: 'jets', title: 'Private Jets', description: 'Private flights to Ibiza. VIP arrivals and departures' },
];

const serviceIcons: { [key: string]: JSX.Element } = {
  vipTables: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <circle cx="24" cy="12" r="8"/>
      <path d="M8 44 L16 24 L32 24 L40 44"/>
      <line x1="12" y1="44" x2="36" y2="44"/>
    </svg>
  ),
  villas: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M4 24 L24 8 L44 24"/>
      <rect x="8" y="24" width="32" height="18"/>
      <rect x="18" y="30" width="12" height="12"/>
    </svg>
  ),
  yachts: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M4 32 Q12 28 24 28 Q36 28 44 32"/>
      <path d="M8 32 L12 20 L24 8 L24 28"/>
      <path d="M24 14 L38 26 L38 32"/>
    </svg>
  ),
  supercars: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M6 28 L10 20 L18 18 L30 18 L38 20 L42 28 L42 32 L6 32 Z"/>
      <circle cx="14" cy="32" r="4"/>
      <circle cx="34" cy="32" r="4"/>
    </svg>
  ),
  transfers: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <rect x="4" y="16" width="40" height="20" rx="4"/>
      <circle cx="12" cy="36" r="4"/>
      <circle cx="36" cy="36" r="4"/>
      <rect x="8" y="20" width="8" height="6" rx="1"/>
      <rect x="18" y="20" width="8" height="6" rx="1"/>
    </svg>
  ),
  security: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M24 4 L40 10 L40 22 C40 32 32 40 24 44 C16 40 8 32 8 22 L8 10 Z"/>
      <circle cx="24" cy="20" r="4"/>
      <path d="M18 28 L24 34 L30 28"/>
    </svg>
  ),
  dining: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <ellipse cx="24" cy="32" rx="18" ry="8"/>
      <path d="M6 32 L6 28 Q6 20 24 20 Q42 20 42 28 L42 32"/>
      <circle cx="24" cy="10" r="4"/>
      <path d="M24 14 L24 20"/>
    </svg>
  ),
  jets: (
    <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-white stroke-1 fill-none transition-all duration-300 group-hover:stroke-cyan">
      <path d="M24 4 L24 44"/>
      <path d="M8 20 L24 14 L40 20"/>
      <path d="M12 38 L24 34 L36 38"/>
      <circle cx="24" cy="10" r="3"/>
    </svg>
  ),
};

export default function Services() {
  const handleServiceClick = (serviceKey: string) => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: { service: serviceKey } }));
  };

  return (
    <section id="services" className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-center mb-16 tracking-wider">
        Our Services <span className="text-cyan">Premium</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.key}
            onClick={() => handleServiceClick(service.key)}
            className="service-card group bg-dark border border-white/5 p-8 md:p-10 text-center cursor-pointer"
          >
            <div className="mb-6 flex justify-center">
              {serviceIcons[service.key]}
            </div>
            <h3 className="font-bebas text-lg md:text-xl tracking-widest mb-3">
              {service.title}
            </h3>
            <p className="text-xs md:text-sm text-gray font-light leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
