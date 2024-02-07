import ProgressCard from './_ProgressCard';
import {type ProgressPageProps} from '@/app/[lng]/progress/[code]/params';
import CenterLayout from '@/app/components/layout/CenterLayout';

export default async function ProgressPage(props: ProgressPageProps) {
  const {lng} = props.params;
  return (
    <CenterLayout lng={lng}>
      <ProgressCard lng={lng} code={props.params.code} />
    </CenterLayout>
  );
}
