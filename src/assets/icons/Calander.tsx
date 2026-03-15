import type { SVGProps } from "react";
const SvgCalander = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.5}
      d="M4.917 4.083V.75m6.666 3.333V.75m-7.5 6.667h8.334m-10 8.333h11.666c.92 0 1.667-.746 1.667-1.667v-10c0-.92-.746-1.666-1.667-1.666H2.417c-.92 0-1.667.746-1.667 1.666v10c0 .92.746 1.667 1.667 1.667"
    />
  </svg>
);
export default SvgCalander;
