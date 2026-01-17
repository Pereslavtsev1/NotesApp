import CtaSection from '@/components/home/sections/cta/cta-section';
import FeaturesSection from '@/components/home/sections/features/features-section';
import HeroSection from '@/components/home/sections/hero/hero-section';

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
      <HeroSection className="py-24" />
      <FeaturesSection />
      <CtaSection className="py-24" />
    </div>
  );
}
