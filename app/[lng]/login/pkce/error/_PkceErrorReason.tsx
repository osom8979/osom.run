'use client';

import {useSearchParams} from 'next/navigation';
import {Fragment} from 'react';
import useTranslation from '@/app/libs/i18n/client';

export type ReasonTypes = null | 'error' | 'nocode' | 'rejected';
export const REASON_PARAM_KEY = 'reason';

interface ReasonTextProps {
  lng?: string;
  reason?: ReasonTypes;
}

export default function PkceErrorReason(props: ReasonTextProps) {
  const {t} = useTranslation(props.lng, 'login-pkce-error');
  const params = useSearchParams();
  const paramsReason = params.get(REASON_PARAM_KEY) as ReasonTypes;
  const reason = props.reason ?? paramsReason;

  const getReasonMessage = () => {
    if (reason === null) {
      return t('reason.null');
    } else if (reason === 'error') {
      return t('reason.error', {
        name: params.get('name'),
        code: params.get('code'),
        description: params.get('description'),
      });
    } else if (reason === 'nocode') {
      return t('reason.nocode');
    } else if (reason === 'rejected') {
      return t('reason.rejected');
    } else {
      return t('reason.unknown');
    }
  };

  return <Fragment>{getReasonMessage()}</Fragment>;
}
