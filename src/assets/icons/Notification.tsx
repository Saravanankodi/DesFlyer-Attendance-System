import * as React from "react";
import type { SVGProps } from "react";
const SvgNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={17}
    fill="none"
    {...props}
  >
    <path
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.917 12.417h4.166l-1.17-1.171a1.7 1.7 0 0 1-.496-1.197V7.417A5 5 0 0 0 9.083 2.7v-.284a1.667 1.667 0 0 0-3.333 0V2.7a5 5 0 0 0-3.333 4.716v2.632c0 .449-.179.88-.496 1.197L.75 12.416h4.167m5 0v.834a2.5 2.5 0 0 1-5 0v-.833m5 0h-5"
    />
  </svg>
);
export default SvgNotification;
