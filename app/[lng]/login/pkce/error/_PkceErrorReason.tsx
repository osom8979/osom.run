'use client';

import {useSearchParams} from 'next/navigation';
import {Fragment} from 'react';
import useTranslation from '@/app/libs/i18n/client';
import {ReasonType} from '@/app/paths';

export const REASON_PARAM_KEY = 'reason';
export const NAME_PARAM_KEY = 'name';
export const CODE_PARAM_KEY = 'code';
export const DESCRIPTION_PARAM_KEY = 'description';

interface ReasonTextProps {
  lng: string;
}

export default function PkceErrorReason(props: ReasonTextProps) {
  const {t} = useTranslation(props.lng, 'login-pkce-error');
  const params = useSearchParams();
  const reason = params.get(REASON_PARAM_KEY) as ReasonType;

  const getReasonMessage = () => {
    if (reason === null) {
      return t('reason.null');
    } else if (reason === 'error') {
      return t('reason.error', {
        name: params.get(NAME_PARAM_KEY),
        code: params.get(CODE_PARAM_KEY),
        description: params.get(DESCRIPTION_PARAM_KEY),
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
