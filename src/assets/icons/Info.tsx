import type { SVGProps } from "react";
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <path
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.083 11.583H8.25V8.25h-.833m.833-3.333h.008M15.75 8.25a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0"
    />
  </svg>
);
export default SvgInfo;
