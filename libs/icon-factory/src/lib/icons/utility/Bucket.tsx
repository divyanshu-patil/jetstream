import * as React from 'react';
function SvgBucket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" fill="unset" aria-hidden="true" {...props}>
      <path d="M490 110c0-62-98-90-190-90s-190 28-190 90v4C24 140 10 195 10 226c0 30 15 61 41 83 23 19 51 30 79 31h8c65-2 129-23 147-59a40 40 0 01-15-31c0-22 18-40 40-40s40 18 40 40a40 40 0 01-25 37c-20 56-100 93-195 93v60c0 33 76 60 170 60s170-27 170-60V153c13-12 20-26 20-43zM300 80a240 240 0 01124 26c3 2 3 6 0 8-16 11-58 26-124 26s-108-15-124-26a5 5 0 010-8 240 240 0 01124-26zM77 278a69 69 0 01-27-52c0-45 41-66 77-75l3 3v146a90 90 0 01-53-22z" />
    </svg>
  );
}
export default SvgBucket;
