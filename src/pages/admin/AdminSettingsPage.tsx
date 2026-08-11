import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { changePasswordRequest } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/getErrorMessage';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Za-z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function AdminSettingsPage() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const mutation = useMutation({
    mutationFn: changePasswordRequest,
    onSuccess: () => {
      toast.success('Password changed successfully');
      reset();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not change password')),
  });

  const onSubmit = (values: PasswordFormValues) =>
    mutation.mutate({ currentPassword: values.currentPassword, newPassword: values.newPassword });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
        <p className="text-muted">Manage your admin account security.</p>
      </div>

      <Card className="max-w-lg">
        <h2 className="mb-1 font-semibold text-secondary">Account</h2>
        <p className="mb-4 text-sm text-muted">
          {user?.firstName} {user?.lastName} · {user?.email}
        </p>

        <h3 className="mb-4 text-sm font-semibold text-secondary">Change Password</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <PasswordInput label="Current Password" error={errors.currentPassword?.message} {...register('currentPassword')} />
          <PasswordInput label="New Password" error={errors.newPassword?.message} {...register('newPassword')} />
          <PasswordInput label="Confirm New Password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
          <Button type="submit" disabled={mutation.isPending} className="w-fit">
            {mutation.isPending ? 'Updating…' : 'Update Password'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
