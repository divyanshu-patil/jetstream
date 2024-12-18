import * as React from 'react';
function SvgFirstNonEmpty(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="unset" aria-hidden="true" {...props}>
      <path d="M559 493l227-228c8-8 8-20 0-29l-27-29c-8-8-20-8-29 0L501 436c-5 5-14 5-19 0L254 206c-8-8-20-8-29 0l-29 29c-8 8-8 20 0 29l228 228c5 5 5 14 0 19L196 740c-8 8-8 20 0 29l29 29c8 8 20 8 29 0l228-228c5-5 14-5 19 0l226 226c8 8 20 8 29 0l29-29c8-8 8-20 0-29L559 512c-6-6-6-14 0-19z" />
    </svg>
  );
}
export default SvgFirstNonEmpty;
