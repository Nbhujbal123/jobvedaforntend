import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, RotateCcw, ShieldCheck, Users } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { HeroVisualCard } from '@/components/common/HeroVisualCard';
import { Reveal } from '@/components/common/Reveal';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import { SectionBackground } from '@/components/common/SectionBackground';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { CompanyCardSkeletonGrid } from '@/components/companies/CompanyCardSkeleton';
import { fetchCompanies } from '@/services/companyService';
import { COMPANY_SIZE_OPTIONS, INDUSTRIES } from '@/constants/companyOptions';
import { ROUTES } from '@/constants/routes';
import { backgroundImages } from '@/constants/images';
import { usePageMeta } from '@/hooks/usePageMeta';

export function CompaniesPage() {
  usePageMeta(
    'Companies',
    'Explore trusted, verified employers hiring on Jobveda and discover your next career opportunity.',
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');

  const industry = searchParams.get('industry') ?? '';
  const location = searchParams.get('location') ?? '';
  const companySize = searchParams.get('companySize') ?? '';
  const verifiedOnly = searchParams.get('verified') === 'true';
  const page = Number(searchParams.get('page') ?? '1');

  const queryParams = useMemo(
    () => ({
      page,
      keyword: searchParams.get('keyword') || undefined,
      industry: industry || undefined,
      location: location || undefined,
      companySize: companySize || undefined,
      verified: verifiedOnly || undefined,
    }),
    [page, searchParams, industry, location, companySize, verifiedOnly],
  );

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['companies', 'list', queryParams],
    queryFn: () => fetchCompanies(queryParams),
  });

  const { data: featured } = useQuery({
    queryKey: ['companies', 'featured'],
    queryFn: () => fetchCompanies({ verified: true, limit: 4 }),
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const hasActiveFilters = Boolean(industry || location || companySize || verifiedOnly || keyword);

  const clearFilters = () => {
    setKeyword('');
    setSearchParams({});
  };

  return (
    <>
      {/* Hero */}
      <SectionBackground
        image={backgroundImages.companies}
        overlay="subtle"
        className="overflow-hidden pt-10 pb-20 md:pt-14 md:pb-24"
      >
        <Container className="flex flex-col gap-8">
          <Breadcrumb items={[{ label: 'Companies' }]} />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
                Hiring Partners
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-secondary sm:text-5xl">
                Find Your Next Opportunity
              </h1>
              <p className="mt-5 max-w-lg text-base text-muted md:text-lg">
                Explore trusted companies and discover career opportunities with leading employers.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <HeroVisualCard
                icon={Building2}
                caption="Connecting you with verified, trusted employers"
                badges={[
                  { icon: Users, value: `${data?.totalResults ?? '—'}`, label: 'Companies', position: 'top-left' },
                  { icon: ShieldCheck, value: `${featured?.totalResults ?? '—'}`, label: 'Verified', position: 'bottom-right', delay: 0.65 },
                ]}
              />
            </Reveal>
          </div>
        </Container>
      </SectionBackground>

      {/* Search + Filters */}
      <section className="bg-background py-12 md:py-16">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4 rounded-[16px] border border-secondary/10 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_auto]">
              <Input
                placeholder="Search by company name, industry, or location"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') updateParam('keyword', keyword);
                }}
              />
              <Button type="button" onClick={() => updateParam('keyword', keyword)} className="md:w-auto">
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                placeholder="Any industry"
                options={INDUSTRIES.map((i) => ({ label: i.label, value: i.label }))}
                value={industry}
                onChange={(event) => updateParam('industry', event.target.value)}
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(event) => updateParam('location', event.target.value)}
              />
              <Select
                placeholder="Any company size"
                options={COMPANY_SIZE_OPTIONS}
                value={companySize}
                onChange={(event) => updateParam('companySize', event.target.value)}
              />
              <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-secondary/15 px-4 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(event) => updateParam('verified', event.target.checked ? 'true' : '')}
                  className="h-4 w-4 rounded accent-primary"
                />
                Verified only
              </label>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Clear all filters
              </button>
            )}
          </Reveal>

          {/* Featured companies */}
          {featured && featured.data.length > 0 && !hasActiveFilters && (
            <div className="flex flex-col gap-5">
              <SectionHeading
                align="left"
                eyebrow="Featured"
                title="Featured Companies"
                description="Verified employers actively hiring on Jobveda."
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.data.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              eyebrow="Directory"
              title="All Companies"
              description={data ? `${data.totalResults} companies found` : undefined}
            />

            {(isLoading || isFetching) && <CompanyCardSkeletonGrid />}

            {isError && !isLoading && (
              <div className="flex flex-col items-center gap-3 rounded-[16px] border border-dashed border-secondary/15 bg-accent/40 px-6 py-16 text-center">
                <p className="text-muted">Could not load companies right now. Please try again.</p>
                <Button variant="outline" onClick={() => refetch()}>
                  <RotateCcw size={14} aria-hidden="true" />
                  Retry
                </Button>
              </div>
            )}

            {!isLoading && !isFetching && !isError && data && (
              <>
                {data.data.length === 0 ? (
                  <EmptyState
                    icon={Building2}
                    title="No companies available at the moment."
                    description={hasActiveFilters ? 'Try adjusting or clearing your filters.' : undefined}
                  />
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {data.data.map((company, index) => (
                        <motion.div
                          key={company.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                        >
                          <CompanyCard company={company} />
                        </motion.div>
                      ))}
                    </div>
                    <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
                  </>
                )}
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-accent/30 py-16 md:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Browse By Sector" title="Industries" description="Find companies hiring in your field." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((item, index) => (
              <Reveal key={item.label} delay={(index % 5) * 0.06}>
                <button
                  type="button"
                  onClick={() => setSearchParams({ industry: item.label })}
                  className="flex w-full flex-col items-center gap-3 rounded-[16px] bg-white p-5 text-center shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <item.icon size={22} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-secondary">{item.label}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionBackground
              image={backgroundImages.cta}
              overlay="brand"
              className="overflow-hidden rounded-[16px]"
              contentClassName="flex flex-col items-center gap-6 px-6 py-14 text-center text-white sm:px-16"
            >
              <h2 className="max-w-xl text-3xl font-bold md:text-4xl">
                Looking for your next career opportunity?
              </h2>
              <p className="max-w-lg text-white/85">
                Browse thousands of open roles from the companies listed here.
              </p>
              <Link
                to={ROUTES.JOBS}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-base font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
              >
                Explore Jobs
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </SectionBackground>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
