import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../context/ToastContext';
import type { LoginDto } from '../../../types/api';
import { useAuth } from '../context/AuthContext';
import { useAuthService } from '../services/authService';


export const useLogin = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const { login } = useAuthService();
  
  const [form, setForm] = useState<LoginDto>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<keyof LoginDto, string | undefined>>({
    email: undefined,
    password: undefined,
  });

  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<keyof LoginDto, string | undefined> = {
      email: undefined,
      password: undefined,
    };

    if (!form.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!form.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (form.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await login(form);
      await signIn({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      });
      showToast({
        message: t('auth.messages.loginSuccess'),
        type: 'success'
      });
    } catch (error: any) {
      console.error('Login error:', error);
      showToast({
        message: error.message || t('auth.messages.loginError'),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };


  const updateForm = (field: keyof LoginDto, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    form,
    errors,
    loading,
    updateForm,
    handleLogin,
  };
}; 