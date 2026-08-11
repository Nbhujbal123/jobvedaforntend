import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { BlogCard } from '@/components/blogs/BlogCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { LATEST_BLOGS } from '@/constants/homeData';
import { ROUTES } from '@/constants/routes';

export function LatestBlogsSection() {
  return (
    <section className="bg-accent/40 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <SectionHeading
            align="left"
            eyebrow="From The Blog"
            title="Latest Insights"
            description="Career tips and hiring trends from the Jobveda team."
            className="items-center text-center sm:items-start sm:text-left"
          />
          <Link to={ROUTES.BLOGS} className={buttonVariants('outline', 'md')}>
            View All Articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LATEST_BLOGS.map((blog, index) => (
            <Reveal key={blog.id} delay={index * 0.1}>
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
