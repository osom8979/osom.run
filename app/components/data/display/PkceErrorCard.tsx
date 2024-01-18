'use client';

import {useSearchParams} from 'next/navigation';
import GoBackButton from '@/app/components/data/input/GoBackButton';
import MdiBarcodeOff from '@/app/icons/mdi/MdiBarcodeOff';
import useTranslation from '@/app/libs/i18n/client';

type ReasonTypes = null | 'nocode' | 'rejected';

export interface PkceErrorCardProps {
  lng?: string;
  reason?: ReasonTypes;
}

export default function PkceErrorCard(props: PkceErrorCardProps) {
  const {t} = useTranslation(props.lng, 'components/data/display/PkceErrorCard');
  const params = useSearchParams();
  const paramsReason = params.get('reason') as ReasonTypes;
  const reason = props.reason ?? paramsReason;

  const getReasonMessage = () => {
    if (reason === null) {
      return t('reasons.null');
    } else if (reason === 'nocode') {
      return t('reasons.nocode');
    } else if (reason === 'rejected') {
      return t('reasons.rejected');
    } else {
      return t('reasons.unknown');
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <figure>
          <MdiBarcodeOff className="w-28 h-28" />
        </figure>

        <h2 className="card-title my-2">{t('title')}</h2>

        <p>{getReasonMessage()}</p>

        <div className="card-actions mt-6">
          <GoBackButton className="btn btn-primary">
            <span>{t('back')}</span>
          </GoBackButton>
        </div>
      </div>
    </div>
  );
}
