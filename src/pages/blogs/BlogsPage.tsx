import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { BlogCard } from '@/components/blogs/BlogCard';
import { fetchBlogs } from '@/services/blogService';
import { ROUTES } from '@/constants/routes';

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function BlogsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs', 'list', { page }],
    queryFn: () => fetchBlogs({ page }),
  });

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="From The Blog"
          title="Jobveda Blog"
          description="Career tips, hiring trends, and industry insights."
        />

        {isLoading && <LoadingSpinner className="py-20" size={28} label="Loading articles" />}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <SearchX size={28} aria-hidden="true" />
            <p>Could not load articles right now. Please try again shortly.</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
                <SearchX size={28} aria-hidden="true" />
                <p>No articles published yet. Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {data.data.map((blog) => (
                    <Link key={blog.id} to={ROUTES.BLOG_DETAILS.replace(':id', blog.slug)}>
                      <BlogCard
                        blog={{
                          id: blog.id,
                          title: blog.title,
                          excerpt: blog.excerpt,
                          category: blog.category,
                          date: new Date(blog.publishedAt ?? blog.createdAt).toLocaleDateString(),
                          readTime: estimateReadTime(blog.content),
                        }}
                      />
                    </Link>
                  ))}
                </div>
                <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
              </>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
