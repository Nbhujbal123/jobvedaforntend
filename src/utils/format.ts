export function formatSalaryRange(min: number, max: number): string {
  return `₹${min} - ${max} LPA`;
}

export function formatExperienceRange(min?: number, max?: number): string | undefined {
  if (min === undefined || max === undefined) return undefined;
  if (min === 0 && max === 0) return 'Fresher';
  return `${min}-${max} yrs`;
}
