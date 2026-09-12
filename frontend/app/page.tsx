import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ProductPreview from '@/components/landing/ProductPreview';
import Capabilities from '@/components/landing/Capabilities';
import Lifecycle from '@/components/landing/Lifecycle';
import TestComponent from '@/components/landing/TestComponent';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <ProductPreview />
        <Capabilities />
        <Lifecycle />
        <section className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TestComponent />
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}