import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Difference from '@/components/Difference';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Services />
      <Difference />
      <Contact />
      <Footer />
      <ChatButton />
    </main>
  );
}
