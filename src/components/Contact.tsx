'use client';

export default function Contact() {
  return (
    <section className="py-24 px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl mb-12 tracking-wider">Ready for the <span className="text-cyan">Extreme</span> Experience?</h2>
        <div className="flex flex-wrap gap-6 justify-center mb-16">
          <button onClick={() => window.dispatchEvent(new CustomEvent('openChat'))} className="px-10 py-5 font-bebas text-xl tracking-wider bg-cyan border-2 border-cyan text-black hover:bg-transparent hover:text-cyan transition-all duration-300">Start Planning</button>
          <a href="https://wa.me/34600470136" target="_blank" rel="noopener noreferrer" className="px-10 py-5 font-bebas text-xl tracking-wider bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300">Direct WhatsApp</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div><span className="text-cyan block mb-2">Email</span><a href="mailto:info@extremeibiza.es" className="text-gray hover:text-white transition-colors">info@extremeibiza.es</a></div>
          <div><span className="text-cyan block mb-2">Booking</span><a href="mailto:booking@extremeibiza.es" className="text-gray hover:text-white transition-colors">booking@extremeibiza.es</a></div>
          <div><span className="text-cyan block mb-2">Location</span><span className="text-gray">Ibiza, Spain</span></div>
        </div>
      </div>
    </section>
  );
}
