import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { Button } from '@/components/ui/Button';
import { useLogin } from '@/hooks/useLogin';
import { getDashboardPath, ROUTES } from '@/constants/routes';
import { getErrorMessage, getFieldErrors } from '@/utils/getErrorMessage';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LocationState {
  from?: { pathname: string };
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(`Welcome back, ${data.user.firstName}!`);
        const redirectTo = (location.state as LocationState | null)?.from?.pathname;
        navigate(redirectTo ?? getDashboardPath(data.user.role), { replace: true });
      },
      onError: (error) => {
        const fieldErrors = getFieldErrors(error);
        if (Object.keys(fieldErrors).length > 0) {
          for (const [field, message] of Object.entries(fieldErrors)) {
            if (field === 'email' || field === 'password') {
              setError(field, { message });
            }
          }
          return;
        }
        toast.error(getErrorMessage(error, 'Invalid email or password'));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        label="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex justify-end">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" disabled={loginMutation.isPending} className="w-full">
        {loginMutation.isPending ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  );
}
