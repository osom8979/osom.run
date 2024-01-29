import type {PropsWithChildren} from 'react';
import type {I18nParams} from '@/app/[lng]/params';

export interface ProgressParams {
  code: string;
}

export interface ProgressProps {
  params: I18nParams & ProgressParams;
}

export type ProgressLayoutProps = PropsWithChildren<ProgressProps>;

export interface ProgressPageProps extends ProgressProps {
  searchParams: URLSearchParams;
}
