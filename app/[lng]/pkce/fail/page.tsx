import {type I18nRouterProps} from '@/app/[lng]/params';
import PkceErrorCard from '@/app/components/data/display/PkceErrorCard';
import CenterDialog from '@/app/components/layout/CenterDialog';

export default function PkceFailurePage(props: I18nRouterProps) {
  const lng = props.params.lng;
  return (
    <CenterDialog lng={lng}>
      <PkceErrorCard lng={lng} />
    </CenterDialog>
  );
}
