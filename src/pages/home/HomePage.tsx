import { Container } from '@/components/common/Container';
import { HeroSection } from '@/components/home/HeroSection';
import { JobSearchBar } from '@/components/home/JobSearchBar';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { JobCategoriesSection } from '@/components/home/JobCategoriesSection';
import { FeaturedJobsSection } from '@/components/home/FeaturedJobsSection';
import { TrainingProgramsSection } from '@/components/home/TrainingProgramsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { HiringProcessSection } from '@/components/home/HiringProcessSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { HiringPartnersSection } from '@/components/home/HiringPartnersSection';
import { LatestBlogsSection } from '@/components/home/LatestBlogsSection';
import { ContactCtaSection } from '@/components/home/ContactCtaSection';

export function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="relative z-10 -mt-10 md:-mt-14">
        <Container>
          <JobSearchBar />
        </Container>
      </div>

      <StatsSection />
      <ServicesSection />
      <JobCategoriesSection />
      <FeaturedJobsSection />
      <TrainingProgramsSection />
      <WhyChooseUsSection />
      <HiringProcessSection />
      <TestimonialsSection />
      <HiringPartnersSection />
      <LatestBlogsSection />
      <ContactCtaSection />
    </>
  );
}
