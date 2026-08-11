import { Clock, MonitorPlay } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Course } from '@/types/course.types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card hoverable className="flex flex-col gap-4">
      <Badge variant="neutral">{course.category}</Badge>
      <h3 className="text-base font-semibold text-secondary">{course.title}</h3>
      <div className="flex flex-wrap gap-4 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} aria-hidden="true" />
          {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MonitorPlay size={14} aria-hidden="true" />
          {course.mode}
        </span>
      </div>
    </Card>
  );
}
