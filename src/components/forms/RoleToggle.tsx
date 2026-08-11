import { Briefcase, UserRound, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { RegisterableRole } from '@/types/auth.types';

interface RoleToggleProps {
  value: RegisterableRole;
  onChange: (role: RegisterableRole) => void;
}

interface RoleOption {
  value: RegisterableRole;
  label: string;
  description: string;
  icon: LucideIcon;
}

const OPTIONS: RoleOption[] = [
  { value: 'candidate', label: "I'm a Candidate", description: 'Looking for a job', icon: UserRound },
  { value: 'employer', label: "I'm an Employer", description: 'Hiring talent', icon: Briefcase },
];

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Register as">
      {OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center transition-colors',
              isActive
                ? 'border-primary bg-accent text-primary'
                : 'border-secondary/15 text-secondary/70 hover:border-primary/40',
            )}
          >
            <option.icon size={20} aria-hidden="true" />
            <span className="text-sm font-semibold">{option.label}</span>
            <span className="text-xs text-muted">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}
