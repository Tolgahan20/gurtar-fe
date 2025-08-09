import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../context/ToastContext';
import { useAuthService } from '../services/authService';

WebBrowser.maybeCompleteAuthSession();

interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone_number: string;
  profile_image_url: string;
}

interface RegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  full_name?: string;
  phone_number?: string;
}

export const useRegister = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { register } = useAuthService();

  const [form, setForm] = useState<RegisterState>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    profile_image_url: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);


  const validateForm = () => {
    const newErrors: RegisterErrors = {};

    // Email validation
    if (!form.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    // Password validation
    if (!form.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (form.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordsDontMatch');
    }

    // Full name validation
    if (!form.full_name) {
      newErrors.full_name = t('auth.errors.fullNameRequired');
    }

    // Phone number validation
    if (!form.phone_number) {
      newErrors.phone_number = t('auth.errors.phoneNumberRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = form;
      await register(registerData);
      showToast(t('auth.messages.registerSuccess'), 'success');
      router.replace({
        pathname: '/verify-email',
        params: { email: form.email }
      });
    } catch (error: any) {
      console.error('Register error:', error);
      showToast(error.message || t('auth.messages.registerError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field: keyof RegisterState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    form,
    errors,
    loading,
    updateForm,
    handleRegister: handleSubmit,
  };
};
