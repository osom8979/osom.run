import ProgressCard from '@/app/[lng]/progress/[code]/_ProgressCard';
import {type ProgressPageProps} from '@/app/[lng]/progress/[code]/params';

export default async function ProgressPage(props: ProgressPageProps) {
  const {lng} = props.params;
  return (
    <div className="daisy-center">
      <ProgressCard lng={lng} code={props.params.code} />
    </div>
  );
}
