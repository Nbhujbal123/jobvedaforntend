import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Tag } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { fetchBlogBySlug } from '@/services/blogService';

export function BlogDetailsPage() {
  const { id: slug } = useParams<{ id: string }>();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blogs', 'detail', slug],
    queryFn: () => fetchBlogBySlug(slug as string),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  if (!blog) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
        <h1 className="text-2xl font-bold text-secondary">Article not found</h1>
      </Container>
    );
  }

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex justify-center">
        <article className="w-full max-w-3xl">
          {blog.coverImageUrl && (
            <img
              src={blog.coverImageUrl}
              alt={blog.title}
              className="mb-6 h-64 w-full rounded-[16px] object-cover"
            />
          )}
          <Card className="flex flex-col gap-5">
            <Badge variant="primary" className="w-fit">
              {blog.category}
            </Badge>
            <h1 className="text-2xl font-bold text-secondary md:text-3xl">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                {new Date(blog.publishedAt ?? blog.createdAt).toLocaleDateString()}
              </span>
              <span>By {blog.author}</span>
            </div>

            <p className="whitespace-pre-line text-sm leading-relaxed text-text">{blog.content}</p>

            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-secondary/10 pt-4">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    <Tag size={11} className="mr-1" aria-hidden="true" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </article>
      </Container>
    </section>
  );
}
