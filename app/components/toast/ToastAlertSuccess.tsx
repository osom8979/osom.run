'use client';

import type {Toast} from 'react-hot-toast';
import ToastBox from '@/app/components/toast/ToastBox';
import IcBaselineCheckCircleOutline from '@/app/icons/ic/IcBaselineCheckCircleOutline';

interface ToastAlertSuccessProps {
  toast: Toast;
  label?: string;
}

export default function ToastAlertSuccess(props: ToastAlertSuccessProps) {
  return (
    <ToastBox toast={props.toast} className="alert alert-success">
      <IcBaselineCheckCircleOutline />
      <p>{props.label}</p>
    </ToastBox>
  );
}
