import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { BlogPreview } from '@/types/blog.types';

interface BlogCardProps {
  blog: BlogPreview;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card hoverable className="flex flex-col gap-4">
      <Badge variant="primary">{blog.category}</Badge>
      <h3 className="text-base font-semibold text-secondary">{blog.title}</h3>
      <p className="text-sm text-muted">{blog.excerpt}</p>
      <div className="flex items-center justify-between border-t border-secondary/10 pt-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={13} aria-hidden="true" />
          {blog.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} aria-hidden="true" />
          {blog.readTime}
        </span>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Read More
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </Card>
  );
}
