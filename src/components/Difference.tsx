'use client';

export default function Difference() {
  return (
    <section className="py-24 px-8 text-center bg-dark">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <span className="inline-block px-6 py-2 border border-cyan text-cyan text-sm tracking-widest mb-8">
          15 Years of Excellence
        </span>
        
        {/* Quote */}
        <blockquote className="font-bebas text-3xl md:text-4xl lg:text-5xl mb-6 tracking-wide">
          "We have the keys to every door in Ibiza."
        </blockquote>
        
        <p className="text-cyan text-lg mb-8">
          Direct relationships, insider access, and 100% local expertise.
        </p>
        
        <p className="text-gray font-light leading-relaxed max-w-2xl mx-auto">
          Our team lives on the island. We know every villa, every captain, every club manager personally. 
          When you work with us, you get the real Ibiza experience.
        </p>
      </div>
    </section>
  );
}
