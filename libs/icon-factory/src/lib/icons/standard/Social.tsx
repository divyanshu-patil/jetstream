import * as React from 'react';
function SvgSocial(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="unset" aria-hidden="true" {...props}>
      <path d="M700 570c-48 0-89 34-98 80H470c-6 0-10 5-10 11v9c0 10-1 19-3 28-1 6 4 12 10 12h141a100 100 0 00192-40c0-55-45-100-100-100zM433 455c-12-5-23-12-33-20-5-4-12-2-15 3l-71 133-14-1c-55 0-100 45-100 100s45 100 100 100a100 100 0 0069-173l69-128c2-5 0-11-5-14zm67-45c10 0 19-1 28-4l69 127c3 5 9 7 14 4 11-7 22-13 34-17 6-2 8-9 5-14l-72-134c13-17 22-39 22-62 0-55-45-100-100-100s-100 45-100 100 45 100 100 100z" />
    </svg>
  );
}
export default SvgSocial;
