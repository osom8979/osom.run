import Link from 'next/link';
import {appPaths} from '@/app/paths';

interface AnonymousMenuProps {
  lng: string;
  loginLabel: string;
  signupLabel: string;
}

export default async function AnonymousMenu(props: AnonymousMenuProps) {
  const {lng, loginLabel, signupLabel} = props;
  return (
    <ul className="menu menu-horizontal py-0 px-1 font-bold space-x-2">
      <li>
        <Link
          className="btn btn-sm btn-ghost"
          href={`/${lng}${appPaths.login}`}
          hrefLang={lng}
        >
          {loginLabel}
        </Link>
      </li>

      <li>
        <Link
          className="btn btn-sm btn-primary"
          href={`/${lng}${appPaths.signup}`}
          hrefLang={lng}
        >
          {signupLabel}
        </Link>
      </li>
    </ul>
  );
}
