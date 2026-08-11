import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { CategoryCard } from '@/components/jobs/CategoryCard';
import { JOB_CATEGORIES } from '@/constants/homeData';
import { ROUTES } from '@/constants/routes';

export function JobCategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-accent/40 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Explore Roles"
            title="Job Categories"
            description="Browse open roles across the industries we actively recruit for."
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {JOB_CATEGORIES.map((category, index) => (
            <Reveal key={category.id} delay={(index % 5) * 0.06}>
              <CategoryCard
                icon={category.icon}
                name={category.name}
                openRoles={category.openRoles}
                onClick={() => navigate(`${ROUTES.JOBS}?category=${category.id}`)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
