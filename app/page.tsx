import Hero from '@/components/Hero';
import LaunchOfferBanner from '@/components/LaunchOfferBanner';
import HowItWorksNew from '@/components/HowItWorksNew';
import WhyChooseUs from '@/components/WhyChooseUs';
import PricingToggle from '@/components/PricingToggle';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import QRCodeTracking from '@/components/QRCodeTracking';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LaunchOfferBanner />
      <Hero />
      <HowItWorksNew />
      <WhyChooseUs />
      <PricingToggle />
      <Testimonials />
      <CTA />
      <QRCodeTracking />
      <Footer />
    </main>
  );
}
