import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.62}
      d="m17.014 17.014-3.516-3.516M8.912 15.394a6.481 6.481 0 1 0 0-12.963 6.481 6.481 0 0 0 0 12.963"
    />
  </svg>
);
export default SvgSearch;
