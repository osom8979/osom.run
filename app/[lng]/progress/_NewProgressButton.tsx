'use client';

import {useRouter} from 'next/navigation';
import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/button/RequestButton';
import {appPaths} from '@/app/paths';

interface NewProgressButtonProps {
  lng: string;
  label: string;
  className: string;
}

export default function NewProgressButton(props: NewProgressButtonProps) {
  const router = useRouter();
  const handleClick = async () => {
    const {uuid} = await apiClient.newProgress();
    if (uuid) {
      router.push(appPaths.progressCode(uuid));
    } else {
      // TODO: Move error page
      router.push(appPaths.progressCode('-'));
    }
  };

  return (
    <RequestButton
      className={props.className}
      lng={props.lng}
      onClick={handleClick}
      aria-label={props.label}
    >
      {props.label}
    </RequestButton>
  );
}
