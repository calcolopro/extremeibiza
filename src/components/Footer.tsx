'use client';

export default function Footer() {
  return (
    <footer className="py-12 px-8 text-center border-t border-white/5">
      <div className="font-bebas text-2xl tracking-wider mb-6" style={{ fontStyle: 'italic' }}>
        <span className="text-white">E</span>
        <span className="text-cyan">×</span>
        <span className="text-white">TREME</span>
        <span className="text-cyan">IBIZA</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <a href="/privacy" className="text-sm text-gray hover:text-cyan transition-colors">Privacy Policy</a>
        <a href="/terms" className="text-sm text-gray hover:text-cyan transition-colors">Terms of Service</a>
        <a href="https://wa.me/34600470136" target="_blank" rel="noopener noreferrer" className="text-sm text-gray hover:text-cyan transition-colors">WhatsApp</a>
      </div>
      <p className="text-xs text-gray">© 2025 ExtremeIbiza. Part of <a href="https://hub-de.com" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Digital Energy Group</a></p>
    </footer>
  );
}
