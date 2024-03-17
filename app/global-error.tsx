'use client'; // [INFO] Error components must be Client Components

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
      <body className="osom-viewport">
        <main className="osom-center">
          <section className="flex flex-col justify-center">
            <figure className="w-full flex justify-center">
              <IcOutlineErrorOutline className="w-28 h-28" />
            </figure>

            <h3>{t('title')}</h3>

            <p>{props.error.message}</p>

            <p>
              <small>
                <span>{t('digest')}</span>
                <span>{t('colon')}</span>
                <span>{props.error.digest}</span>
              </small>
            </p>

            <button onClick={handlerClick}>
              <span>{t('try_again')}</span>
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
