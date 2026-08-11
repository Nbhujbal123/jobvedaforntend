import { AboutHeroSection } from '@/components/about/AboutHeroSection';
import { OurStorySection } from '@/components/about/OurStorySection';
import { ExploreServicesBanner } from '@/components/about/ExploreServicesBanner';
import { WhyChooseSection } from '@/components/about/WhyChooseSection';
import { ProcessSection } from '@/components/about/ProcessSection';
import { AudienceSection } from '@/components/about/AudienceSection';
import { AboutStatsSection } from '@/components/about/AboutStatsSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { AboutCtaSection } from '@/components/about/AboutCtaSection';
import { usePageMeta } from '@/hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'About Us',
    'Jobveda is a recruitment consultancy connecting talented professionals with trusted employers.',
  );

  return (
    <>
      <AboutHeroSection />
      <OurStorySection />
      <ExploreServicesBanner />
      <WhyChooseSection />
      <ProcessSection />
      <AudienceSection />
      <AboutStatsSection />
      <ValuesSection />
      <AboutCtaSection />
    </>
  );
}
