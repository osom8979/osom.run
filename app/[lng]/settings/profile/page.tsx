import React from 'react';
import {type I18nRouterProps} from '@/app/[lng]/params';
import useTranslation from '@/app/libs/i18n/server';

export default async function LngPage(props: I18nRouterProps) {
  const lng = props.params.lng;
  const {t} = await useTranslation(lng, 'settings-profile');

  return (
    <section>
      <h2>Public Profile</h2>

      <hr />

      <div>{t('')}</div>
    </section>
  );
}
