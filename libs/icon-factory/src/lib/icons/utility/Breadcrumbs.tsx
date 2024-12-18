import * as React from 'react';
function SvgBreadcrumbs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M84 420a10 10 0 01-10-10V109a10 10 0 0110-10h81c4 0 9 2 12 5l116 146c4 5 4 13 0 19L176 415c-3 4-8 6-13 6zm359-170L326 105c-5-6-14-8-21-2l-23 19c-7 5-8 15-2 21l95 117-95 118c-5 6-4 16 2 21l23 19c7 5 15 4 21-2l117-146c4-8 4-15 0-20z" />
    </svg>
  );
}
export default SvgBreadcrumbs;
