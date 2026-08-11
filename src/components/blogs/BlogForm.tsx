import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { JOB_CATEGORY_OPTIONS } from '@/constants/jobOptions';
import type { BlogPayload } from '@/services/blogService';
import type { Blog } from '@/types/blog.types';

const BLOG_STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Unpublished', value: 'unpublished' },
];

const commaToArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const blogFormSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short'),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(1, 'Category is required'),
  author: z.string().trim().min(1, 'Author is required'),
  coverImageUrl: z.string().trim().optional(),
  status: z.enum(['draft', 'published', 'unpublished']),
  excerpt: z.string().trim().min(10, 'Excerpt is too short'),
  content: z.string().trim().min(20, 'Content should be more detailed'),
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  initialBlog?: Blog;
  isSubmitting?: boolean;
  onSubmit: (payload: BlogPayload) => void;
  onCancel: () => void;
}

export function BlogForm({ initialBlog, isSubmitting, onSubmit, onCancel }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialBlog?.title ?? '',
      slug: initialBlog?.slug ?? '',
      category: initialBlog?.category ?? '',
      author: initialBlog?.author ?? '',
      coverImageUrl: initialBlog?.coverImageUrl ?? '',
      status: initialBlog?.status ?? 'draft',
      excerpt: initialBlog?.excerpt ?? '',
      content: initialBlog?.content ?? '',
      tags: initialBlog?.tags.join(', ') ?? '',
    },
  });

  const submit = (values: BlogFormValues) => {
    onSubmit({
      title: values.title,
      slug: values.slug || undefined,
      category: values.category,
      author: values.author,
      coverImageUrl: values.coverImageUrl,
      status: values.status,
      excerpt: values.excerpt,
      content: values.content,
      tags: commaToArray(values.tags ?? ''),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Input label="Title" placeholder="5 Resume Mistakes That Cost You Interviews" error={errors.title?.message} {...register('title')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Slug (optional)" placeholder="auto-generated from title" {...register('slug')} />
        <Select label="Category" placeholder="Select category" options={JOB_CATEGORY_OPTIONS} error={errors.category?.message} {...register('category')} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Author" placeholder="Jobveda Team" error={errors.author?.message} {...register('author')} />
        <Select label="Status" options={BLOG_STATUS_OPTIONS} error={errors.status?.message} {...register('status')} />
      </div>
      <Input label="Cover Image URL" placeholder="https://..." {...register('coverImageUrl')} />
      <Input label="Tags (comma separated)" placeholder="career tips, resume" {...register('tags')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Excerpt</label>
        <textarea
          rows={2}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('excerpt')}
        />
        {errors.excerpt && <span className="text-xs text-red-500">{errors.excerpt.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Content</label>
        <textarea
          rows={8}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('content')}
        />
        {errors.content && <span className="text-xs text-red-500">{errors.content.message}</span>}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialBlog ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}
