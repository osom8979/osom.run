'use client';

import CenterLayout from '@/app/components/layout/CenterLayout';
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
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow h-0">
          <CenterLayout showLogo={true}>
            <section className="osom-card">
              <div className="card-body items-center space-y-4">
                <figure>
                  <IcOutlineErrorOutline className="w-28 h-28" />
                </figure>

                <div className="card-title">
                  <h2>{t('title')}</h2>
                </div>

                <p>{props.error.message}</p>

                <p>
                  <small>
                    <span>{t('digest')}</span>
                    <span>{t('colon')}</span>
                    <span>{props.error.digest}</span>
                  </small>
                </p>

                <div className="card-actions">
                  <button onClick={handlerClick}>
                    <span>{t('try_again')}</span>
                  </button>
                </div>
              </div>
            </section>
          </CenterLayout>
        </main>
      </body>
    </html>
  );
}
