import HomePageFeaturesSection from '@/components/pages/home-page/sections/features/features-section';
import HomePageHeroSection from '@/components/pages/home-page/sections/hero/hero-section';
import HomePageIntroSection from '@/components/pages/home-page/sections/intro/intro-section';

export default function HomePage() {
  return (
    <div className='px-2 sm:px-4 md:px-6 lg:px-8'>
      <HomePageHeroSection className='py-24' />
      <HomePageFeaturesSection />
      <HomePageIntroSection className='py-24' />
    </div>
  );
}
