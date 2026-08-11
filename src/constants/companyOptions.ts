import {
  Banknote,
  Factory,
  GraduationCap,
  Headset,
  HeartPulse,
  Laptop2,
  Megaphone,
  ShoppingBag,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { SelectOption } from '@/types/common.types';

export interface IndustryOption {
  label: string;
  icon: LucideIcon;
}

export const INDUSTRIES: IndustryOption[] = [
  { label: 'IT & Software', icon: Laptop2 },
  { label: 'Healthcare', icon: HeartPulse },
  { label: 'Banking & Finance', icon: Banknote },
  { label: 'Manufacturing', icon: Factory },
  { label: 'BPO & Customer Support', icon: Headset },
  { label: 'Engineering', icon: Wrench },
  { label: 'Education', icon: GraduationCap },
  { label: 'Retail', icon: ShoppingBag },
  { label: 'Marketing', icon: Megaphone },
];

export const COMPANY_SIZE_OPTIONS: SelectOption[] = [
  { label: '1-50 employees', value: '1-50' },
  { label: '51-200 employees', value: '51-200' },
  { label: '201-500 employees', value: '201-500' },
  { label: '501-1000 employees', value: '501-1000' },
  { label: '1000+ employees', value: '1000+' },
];
