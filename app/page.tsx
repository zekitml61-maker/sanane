import Hero from '@/components/Hero';
import LaunchOfferBanner from '@/components/LaunchOfferBanner';
import HowItWorksNew from '@/components/HowItWorksNew';
import WhyChooseUs from '@/components/WhyChooseUs';
import Features from '@/components/Features';
import PricingToggle from '@/components/PricingToggle';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import QRCodeTracking from '@/components/QRCodeTracking';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen page-fade-mask">
      <Navbar />
      <LaunchOfferBanner />
      <Hero />
      <HowItWorksNew />
      <WhyChooseUs />
      <Features />
      <PricingToggle />
      <Testimonials />
      <CTA />
      <QRCodeTracking />
      <Footer />
    </main>
  );
}
