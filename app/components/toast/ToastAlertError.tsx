'use client';

import type {Toast} from 'react-hot-toast';
import ToastBox from '@/app/components/toast/ToastBox';
import IcBaselineErrorOutline from '@/app/icons/ic/IcBaselineErrorOutline';

interface ToastAlertErrorProps {
  toast: Toast;
  label?: string;
}

export default function ToastAlertError(props: ToastAlertErrorProps) {
  return (
    <ToastBox toast={props.toast} className="alert alert-error">
      <IcBaselineErrorOutline />
      <p>{props.label}</p>
    </ToastBox>
  );
}
