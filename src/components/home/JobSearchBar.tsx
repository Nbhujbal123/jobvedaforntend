import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setFilters } from '@/store/slices/jobSlice';
import { ROUTES } from '@/constants/routes';
import type { ExperienceLevel, JobType } from '@/types/job.types';

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevel }[] = [
  { label: 'Fresher', value: 'fresher' },
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
  { label: 'Lead', value: 'lead' },
];

const JOB_TYPE_OPTIONS: { label: string; value: JobType }[] = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
];

export function JobSearchBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filters = {
      keyword: keyword || undefined,
      location: location || undefined,
      experience: (experience || undefined) as ExperienceLevel | undefined,
      jobType: (jobType || undefined) as JobType | undefined,
    };

    dispatch(setFilters(filters));

    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.location) params.set('location', filters.location);
    if (filters.experience) params.set('experience', filters.experience);
    if (filters.jobType) params.set('type', filters.jobType);

    navigate(`${ROUTES.JOBS}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 rounded-[16px] border border-secondary/10 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-end"
    >
      <Input
        label="Keyword"
        id="search-keyword"
        placeholder="Job title, skill, or company"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <div className="relative">
        <Input
          label="Location"
          id="search-location"
          placeholder="City or remote"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <MapPin size={14} className="pointer-events-none absolute right-3.5 top-10 text-muted" aria-hidden="true" />
      </div>
      <Select
        label="Experience"
        id="search-experience"
        placeholder="Any experience"
        options={EXPERIENCE_OPTIONS}
        value={experience}
        onChange={(event) => setExperience(event.target.value)}
      />
      <Select
        label="Job Type"
        id="search-job-type"
        placeholder="Any type"
        options={JOB_TYPE_OPTIONS}
        value={jobType}
        onChange={(event) => setJobType(event.target.value)}
      />
      <Button type="submit" className="w-full md:w-auto">
        <Search size={16} aria-hidden="true" />
        Search Jobs
      </Button>
    </form>
  );
}
