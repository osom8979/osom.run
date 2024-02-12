'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import apiClient from '@/app/api/client';
import CopyUrlButton from '@/app/components/button/CopyUrlButton';
import ModalButton from '@/app/components/button/ModalButton';
import SvgNumber from '@/app/components/SvgNumber';
import SvgSpinners3DotsFade from '@/app/icons/spinners/SvgSpinners3DotsFade';
import TdesignPercent from '@/app/icons/tdesign/TdesignPercent';
import useTranslation from '@/app/libs/i18n/client';

interface ProgressCardProps {
  lng: string;
  code: string;
}

export default function ProgressCard(props: ProgressCardProps) {
  const {t} = useTranslation(props.lng, 'progress');
  const [value, setValue] = useState(0);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const response = await apiClient.readAnonymousProgress(props.code);
      if (typeof response.value === 'number') {
        setValue(response.value);
      } else {
        setError('Response error');
      }
    })();
  }, [props.code]);

  return (
    <section className="osom-card rounded-3xl bg-base-200 bg-gradient-to-b shadow-md shadow-base-content/10">
      <div className="card-body items-center space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center items-end w-full space-x-[-0.8rem]">
            {error ? error : <SvgNumber value={value} />}
            <TdesignPercent className="w-7 h-7 mb-2" />
          </div>

          <p className="flex justify-center items-center text-center animate-pulse">
            <span>{t('progressing')}</span>
            <span className="ml-1 self-end">
              <SvgSpinners3DotsFade />
            </span>
          </p>
        </div>

        <div className="w-full">
          <progress className="progress h-3 w-full" value={value} max="100" />
        </div>

        <div className="card-actions justify-center w-full gap-4">
          <CopyUrlButton
            className="btn btn-sm btn-secondary rounded-3xl w-full sm:w-36"
            successLabel={t('copy_success')}
            errorLabel={t('copy_error')}
          >
            <p>{t('copy')}</p>
          </CopyUrlButton>

          <ModalButton
            className="btn btn-sm btn-error btn-outline w-full sm:w-36"
            title={t('abort_title')}
            detail={t('abort_detail')}
            ok={t('abort_ok')}
          >
            <p>{t('abort')}</p>
          </ModalButton>
        </div>

        <p className="text-center">
          <small>
            {t('more_info')}
            <Link href="#" hrefLang={props.lng} className="link link-primary ml-1">
              {t('document_link')}
            </Link>
          </small>
        </p>
      </div>
    </section>
  );
}
