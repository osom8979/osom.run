'use client';

import {useSearchParams} from 'next/navigation';
import {Fragment} from 'react';
import useTranslation from '@/app/libs/i18n/client';

export type ReasonTypes = null | 'nocode' | 'rejected';
export const REASON_PARAM_KEY = 'reason';

interface ReasonTextProps {
  lng?: string;
  reason?: ReasonTypes;
}

export default function ReasonText(props: ReasonTextProps) {
  const {t} = useTranslation(props.lng, 'components/data/display/ReasonText');
  const params = useSearchParams();
  const paramsReason = params.get(REASON_PARAM_KEY) as ReasonTypes;
  const reason = props.reason ?? paramsReason;

  const getReasonMessage = () => {
    if (reason === null) {
      return t('null');
    } else if (reason === 'nocode') {
      return t('nocode');
    } else if (reason === 'rejected') {
      return t('rejected');
    } else {
      return t('unknown');
    }
  };

  return <Fragment>{getReasonMessage()}</Fragment>;
}
