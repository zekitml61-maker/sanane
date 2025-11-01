import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import PricingToggle from '@/components/PricingToggle';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import QRCodeTracking from '@/components/QRCodeTracking';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <PricingToggle />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <QRCodeTracking />
      <Footer />
    </main>
  );
}
