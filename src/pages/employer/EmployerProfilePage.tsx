import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Building2, Upload } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CompanyForm } from '@/components/companies/CompanyForm';
import {
  fetchMyCompany,
  createCompany,
  updateCompany,
  uploadCompanyLogo,
} from '@/services/companyService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { CompanyPayload } from '@/types/company.types';

export function EmployerProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ['companies', 'mine'],
    queryFn: fetchMyCompany,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['companies', 'mine'] });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success('Company profile created successfully');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create company profile')),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<CompanyPayload>) => updateCompany(company!.id, payload),
    onSuccess: () => {
      toast.success('Company profile updated successfully');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update company profile')),
  });

  const logoMutation = useMutation({
    mutationFn: (file: File) => uploadCompanyLogo(company!.id, file),
    onSuccess: () => {
      toast.success('Logo updated successfully');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not upload logo')),
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) logoMutation.mutate(file);
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Company Profile</h1>
        <p className="text-muted">
          {company ? 'Manage your company details shown to candidates.' : 'Create your company profile before posting jobs.'}
        </p>
      </div>

      {company && (
        <Card className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-accent">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt="Company logo" className="h-full w-full object-cover" />
            ) : (
              <Building2 size={24} className="text-primary" aria-hidden="true" />
            )}
          </div>
          <div>
            <p className="font-semibold text-secondary">{company.name}</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={logoMutation.isPending}>
              <Upload size={14} aria-hidden="true" />
              {logoMutation.isPending ? 'Uploading…' : 'Change Logo'}
            </Button>
          </div>
        </Card>
      )}

      <Card className="max-w-2xl">
        <CompanyForm
          initialCompany={company ?? undefined}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onSubmit={(payload) => (company ? updateMutation.mutate(payload) : createMutation.mutate(payload))}
        />
      </Card>
    </div>
  );
}
