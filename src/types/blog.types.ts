export type BlogStatus = 'draft' | 'published' | 'unpublished';

export interface BlogPreview {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  publishedAt?: string;
  createdAt: string;
}
