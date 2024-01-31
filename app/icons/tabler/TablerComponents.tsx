import {SVGProps} from 'react';

export default function TablerComponents(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m3 12l3 3l3-3l-3-3zm12 0l3 3l3-3l-3-3zM9 6l3 3l3-3l-3-3zm0 12l3 3l3-3l-3-3z"
      ></path>
    </svg>
  );
}
