import {type I18nRouterProps} from '@/app/[lng]/params';
import PkceErrorCard from '@/app/components/data/display/PkceErrorCard';
import CenterMain from '@/app/components/layout/CenterMain';

export default function PkceFailurePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  return (
    <CenterMain lng={lng}>
      <PkceErrorCard lng={lng} />
    </CenterMain>
  );
}
