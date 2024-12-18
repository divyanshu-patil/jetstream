import * as React from 'react';
function SvgNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="unset" aria-hidden="true" {...props}>
      <path d="M43 9A24.2 24.2 0 009 9a24.2 24.2 0 000 34 23.9 23.9 0 0033.9 0c9.4-9.4 9.4-24.6.1-34zm-1 19c0 .6-.4 1-1 1H30a1 1 0 00-1 1v11c0 .5-.5 1-1 1h-4c-.6 0-1-.4-1-1V30c0-.6-.4-1-1-1H11c-.6 0-1-.4-1-1v-4c0-.5.5-1 1-1h11c.6 0 1-.4 1-1V11c0-.5.5-1 1-1h4c.5 0 1 .4 1 1v11c0 .6.4 1 1 1h11c.5 0 1 .5 1 1z" />
    </svg>
  );
}
export default SvgNew;
