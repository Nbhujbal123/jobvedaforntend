import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/15 text-secondary hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-secondary/15 disabled:hover:text-secondary"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <span className="text-sm font-medium text-secondary">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/15 text-secondary hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-secondary/15 disabled:hover:text-secondary"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
