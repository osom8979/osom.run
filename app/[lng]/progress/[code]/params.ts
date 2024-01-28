import type {PropsWithChildren} from 'react';
import type {I18nParams} from '@/app/[lng]/params';

export interface ProgressParams extends I18nParams {
  code: string;
}

export interface ProgressProps {
  params: ProgressParams;
}

export interface ProgressRouterProps extends ProgressProps {
  searchParams: URLSearchParams;
}

export type ProgressLayoutProps = PropsWithChildren<ProgressRouterProps>;
