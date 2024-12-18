import * as React from 'react';
function SvgFallback(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M280 35l-30 146c0 6 4 9 9 9h156c11 0 18 13 13 23L258 492c-7 14-28 9-28-7l30-172c0-6-5-4-11-4H85c-11 0-19-16-13-26L252 28c7-13 28-9 28 7z" />
    </svg>
  );
}
export default SvgFallback;
