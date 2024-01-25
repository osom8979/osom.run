'use client';

import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/button/RequestButton';

interface LogoutButtonProps {
  lng: string;
  label: string;
}

export default function LogoutButton(props: LogoutButtonProps) {
  const handleClick = async () => {
    await apiClient.logout();
  };
  return (
    <RequestButton
      className="btn btn-sm btn-outline btn-secondary w-full"
      lng={props.lng}
      onClick={handleClick}
      aria-label={props.label}
    >
      {props.label}
    </RequestButton>
  );
}
