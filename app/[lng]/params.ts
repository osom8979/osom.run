import type {PropsWithChildren} from 'react';

export interface I18nParams {
  lng: string;
}

export interface I18nCommonProps {
  params: I18nParams;
}

export type I18nLayoutProps = PropsWithChildren<I18nCommonProps>;

export interface I18nPageProps extends I18nCommonProps {
  searchParams: URLSearchParams;
}
