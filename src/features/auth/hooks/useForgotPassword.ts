import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../context/ToastContext';
import { useAuthService } from '../services/authService';

export type ForgotPasswordStep = 'email' | 'otp' | 'newPassword' | 'success' | 'failure';

interface ForgotPasswordState {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordErrors {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useForgotPassword = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { forgotPassword, verifyOtp, resetPassword } = useAuthService();
  
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string>('');
  const [form, setForm] = useState<ForgotPasswordState>({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});

  const validateEmail = (): boolean => {
    const newErrors: ForgotPasswordErrors = {};

    if (!form.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = (): boolean => {
    const newErrors: ForgotPasswordErrors = {};

    if (!form.otp) {
      newErrors.otp = t('auth.errors.otpRequired');
    } else if (!/^\d{6}$/.test(form.otp)) {
      newErrors.otp = t('auth.errors.otpInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNewPassword = (): boolean => {
    const newErrors: ForgotPasswordErrors = {};

    if (!form.newPassword) {
      newErrors.newPassword = t('auth.errors.passwordRequired');
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = t('auth.errors.passwordTooShort');
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordsDontMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    let isValid = false;

    switch (step) {
      case 'email':
        isValid = validateEmail();
        if (!isValid) return;

        setLoading(true);
        try {
          await forgotPassword({ email: form.email });
          showToast(t('auth.messages.otpSent'), 'success');
          setStep('otp');
        } catch (error: any) {
          console.error('Send OTP error:', error);
          showToast(error.message || t('auth.messages.otpSendError'), 'error');
          setStep('failure');
        } finally {
          setLoading(false);
        }
        break;

      case 'otp':
        isValid = validateOTP();
        if (!isValid) return;

        setLoading(true);
        try {
          const response = await verifyOtp({ email: form.email, otp: form.otp });
          if (response?.data?.reset_token) {
            setResetToken(response.data.reset_token);
            showToast(t('auth.messages.otpVerified'), 'success');
            setStep('newPassword');
          } else {
            throw new Error('No reset token received');
          }
        } catch (error: any) {
          console.error('Verify OTP error:', error);
          showToast(error.message || t('auth.messages.otpVerifyError'), 'error');
          setStep('failure');
        } finally {
          setLoading(false);
        }
        break;

      case 'newPassword':
        isValid = validateNewPassword();
        if (!isValid) return;

        setLoading(true);
        try {
          await resetPassword({
            token: resetToken,
            password: form.newPassword,
          });
          showToast(t('auth.messages.passwordResetSuccess'), 'success');
          setStep('success');
        } catch (error: any) {
          console.error('Reset password error:', error);
          showToast(error.message || t('auth.messages.passwordResetError'), 'error');
          setStep('failure');
        } finally {
          setLoading(false);
        }
        break;

      case 'failure':
        setStep('email');
        setForm({
          email: '',
          otp: '',
          newPassword: '',
          confirmPassword: '',
        });
        setResetToken('');
        setErrors({});
        break;
    }
  };

  const updateForm = (field: keyof ForgotPasswordState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    step,
    form,
    errors,
    loading,
    updateForm,
    handleSubmit,
    setStep,
  };
}; 