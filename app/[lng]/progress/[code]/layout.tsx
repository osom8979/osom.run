import {type ProgressLayoutProps} from '@/app/[lng]/progress/[code]/params';

export default async function ProgressCodeLayout(props: ProgressLayoutProps) {
  return <div className="h-osomMain w-full">{props.children}</div>;
}
