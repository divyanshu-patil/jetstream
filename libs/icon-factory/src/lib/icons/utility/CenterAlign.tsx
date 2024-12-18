import * as React from 'react';
function SvgCenterAlign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="unset" aria-hidden="true" {...props}>
      <rect width={48} height={6.4} x={2} y={23.6} rx={1.6} />
      <rect width={14.4} height={48} x={19} y={2} rx={3.2} />
    </svg>
  );
}
export default SvgCenterAlign;
