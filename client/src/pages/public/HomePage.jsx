import HeroSection from '../../components/sections/HeroSection';
import ServicesSection from '../../components/sections/ServicesSection';
import ProductsPreview from '../../components/sections/ProductsPreview';
import PortfolioPreview from '../../components/sections/PortfolioPreview';
import PricingSection from '../../components/sections/PricingSection';
import ProcessSection from '../../components/sections/ProcessSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import CalculatorSection from '../../components/sections/CalculatorSection';
import AuditSection from '../../components/sections/AuditSection';
import ContactSection from '../../components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <ServicesSection />
      <ProductsPreview />
      <PortfolioPreview />
      <PricingSection />
      <ProcessSection />
      <TestimonialsSection />
      <CalculatorSection />
      <AuditSection />
      <ContactSection />
    </div>
  );
}
