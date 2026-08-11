import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { COMPANY_SIZE_OPTIONS, INDUSTRIES } from '@/constants/companyOptions';
import type { Company, CompanyPayload } from '@/types/company.types';

const INDUSTRY_OPTIONS = INDUSTRIES.map((industry) => ({ label: industry.label, value: industry.label }));

const companyFormSchema = z.object({
  name: z.string().trim().min(2, 'Company name is too short'),
  industry: z.string().trim().optional(),
  location: z.string().trim().optional(),
  website: z.string().trim().optional(),
  companySize: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface CompanyFormProps {
  initialCompany?: Company;
  isSubmitting?: boolean;
  onSubmit: (payload: CompanyPayload) => void;
  onCancel?: () => void;
}

export function CompanyForm({ initialCompany, isSubmitting, onSubmit, onCancel }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: initialCompany?.name ?? '',
      industry: initialCompany?.industry ?? '',
      location: initialCompany?.location ?? '',
      website: initialCompany?.website ?? '',
      companySize: initialCompany?.companySize ?? '',
      description: initialCompany?.description ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Input label="Company Name" placeholder="ABC Technologies" error={errors.name?.message} {...register('name')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select label="Industry" placeholder="Select industry" options={INDUSTRY_OPTIONS} {...register('industry')} />
        <Input label="Location" placeholder="Pune, India" {...register('location')} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Website" placeholder="https://example.com" {...register('website')} />
        <Select label="Company Size" placeholder="Select size" options={COMPANY_SIZE_OPTIONS} {...register('companySize')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('description')}
        />
      </div>
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialCompany ? 'Update Company' : 'Create Company'}
        </Button>
      </div>
    </form>
  );
}
