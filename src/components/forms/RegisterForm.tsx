import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { RoleToggle } from '@/components/forms/RoleToggle';
import { Button } from '@/components/ui/Button';
import { useRegister } from '@/hooks/useRegister';
import { getDashboardPath } from '@/constants/routes';
import { getErrorMessage, getFieldErrors } from '@/utils/getErrorMessage';

const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name is too short').max(50),
    lastName: z.string().trim().min(2, 'Last name is too short').max(50),
    email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
    phone: z.string().trim().regex(PHONE_REGEX, 'Enter a valid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Za-z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    role: z.enum(['candidate', 'employer']),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const FIELD_NAMES = ['firstName', 'lastName', 'email', 'phone', 'password', 'role'] as const;

export function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'candidate',
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
      },
      {
        onSuccess: (data) => {
          toast.success(`Welcome to Jobveda, ${data.user.firstName}!`);
          navigate(getDashboardPath(data.user.role), { replace: true });
        },
        onError: (error) => {
          const fieldErrors = getFieldErrors(error);
          if (Object.keys(fieldErrors).length > 0) {
            for (const [field, message] of Object.entries(fieldErrors)) {
              if ((FIELD_NAMES as readonly string[]).includes(field)) {
                setError(field as (typeof FIELD_NAMES)[number], { message });
              }
            }
            return;
          }
          toast.error(getErrorMessage(error, 'Could not create your account'));
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Controller
        control={control}
        name="role"
        render={({ field }) => <RoleToggle value={field.value} onChange={field.onChange} />}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="First name"
          autoComplete="given-name"
          placeholder="Ananya"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last name"
          autoComplete="family-name"
          placeholder="Sharma"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Phone number"
        type="tel"
        autoComplete="tel"
        placeholder="+91 98765 43210"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <Button type="submit" size="lg" disabled={registerMutation.isPending} className="w-full">
        {registerMutation.isPending ? 'Creating account…' : 'Create Account'}
      </Button>
    </form>
  );
}
