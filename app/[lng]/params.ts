import {PropsWithChildren} from 'react';

export interface I18nParams {
  lng: string;
}

export interface I18nCommonProps {
  params: I18nParams;
}

export interface I18nRouterProps extends I18nCommonProps {
  searchParams: URLSearchParams;
}

export interface I18nLayoutProps extends PropsWithChildren<I18nCommonProps> {
  // EMPTY.
}
