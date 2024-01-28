import {type ProgressLayoutProps} from '@/app/[lng]/progress/[code]/params';

export default async function ProgressCodeLayout(props: ProgressLayoutProps) {
  return <div>{props.children}</div>;
}
