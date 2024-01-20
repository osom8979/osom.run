'use client';

import CenterDialog from '@/app/components/layout/CenterDialog';
import IcOutlineErrorOutline from '@/app/icons/ic/IcOutlineErrorOutline';
import useTranslation from '@/app/libs/i18n/client';

interface GlobalErrorProps {
  error: Error & {digest?: string};
  reset: () => void;
}

export default function GlobalError(props: GlobalErrorProps) {
  const {t} = useTranslation(undefined, 'global-error');
  const handlerClick = () => {
    props.reset();
  };
  return (
    <html>
      <body>
        <CenterDialog>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <figure>
                <IcOutlineErrorOutline className="w-28 h-28" />
              </figure>

              <h2 className="card-title my-2">{t('title')}</h2>

              <p>
                <span>{props.error.message}</span>
                <br />
                <span>{t('digest')}</span>
                <span>{t('colon')}</span>
                <span>{props.error.digest}</span>
              </p>

              <div className="card-actions mt-6">
                <button onClick={handlerClick}>
                  <span>{t('try_again')}</span>
                </button>
              </div>
            </div>
          </div>
        </CenterDialog>
      </body>
    </html>
  );
}
