import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ProductPreview from '@/components/landing/ProductPreview';
import Capabilities from '@/components/landing/Capabilities';
import Lifecycle from '@/components/landing/Lifecycle';
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
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}