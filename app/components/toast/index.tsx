'use client';

import toast from 'react-hot-toast';
import ToastAlertError from '@/app/components/toast/ToastAlertError';
import ToastAlertSuccess from '@/app/components/toast/ToastAlertSuccess';

export function toastSuccess(label: string) {
  toast.custom(t => {
    return <ToastAlertSuccess toast={t} label={label} />;
  });
}

export function toastError(label: string) {
  toast.custom(t => {
    return <ToastAlertError toast={t} label={label} />;
  });
}
