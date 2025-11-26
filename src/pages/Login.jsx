import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { loginUser, accountType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (accountType === 'doctor' ? '/doctor-dashboard' : '/chat');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');

    const result = await loginUser(data);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setApiError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-textPrimary">
          Welcome back to NeuralHealer
        </h2>
        <p className="mt-2 text-center text-sm text-textSecondary">
          Sign in to continue your therapy journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {apiError}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-textPrimary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-gray-100"
              variant="ghost"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to NeuralHealer?</span>
              </div>
            </div>

            <div className="mt-6 bg-gray-100">
              <Link to="/register">
                <Button variant="ghost" size="large" className="w-full">
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
