import * as React from 'react';
function SvgRating(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M274 31l46 150c2 6 8 9 14 9h150c15 0 21 20 10 29l-123 90c-5 4-7 11-5 17l58 154c4 14-10 26-23 17l-130-98c-6-4-13-4-19 0l-132 98c-12 9-28-3-23-17l56-154c2-6 0-13-5-17L26 219c-12-9-5-29 10-29h150c6 0 11-2 13-9l47-151c4-14 24-13 28 1zm-14 97v217l82 61c7 5 16-2 14-10l-33-86c-3-7 0-13 4-15l69-48c7-5 4-17-5-17h-80c-4 0-13-1-16-10l-27-86a9 9 0 00-8-6z" />
    </svg>
  );
}
export default SvgRating;
