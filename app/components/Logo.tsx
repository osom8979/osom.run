'use client';

import OsomUi from 'osom-ui';
import {SVGProps} from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return <OsomUi.OsomRunLogo width="5em" height="2em" {...props} />;
}
