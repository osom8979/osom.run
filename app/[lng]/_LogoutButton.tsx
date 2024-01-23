'use client';

import apiClient from '@/app/api/client';
import RequestButton from '@/app/components/RequestButton';

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
      lng={props.lng}
      onClick={handleClick}
      className="btn btn-sm btn-outline btn-secondary w-full"
    >
      {props.label}
    </RequestButton>
  );
}
