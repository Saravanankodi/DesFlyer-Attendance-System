import type { SVGProps } from "react";
const SvgDashboard = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.583 9.083v5m-2.5-2.5h5M2.417 5.75h1.666c.92 0 1.667-.746 1.667-1.667V2.417c0-.92-.746-1.667-1.667-1.667H2.417C1.497.75.75 1.496.75 2.417v1.666c0 .92.746 1.667 1.667 1.667m8.333 0h1.667c.92 0 1.666-.746 1.666-1.667V2.417c0-.92-.746-1.667-1.666-1.667H10.75c-.92 0-1.667.746-1.667 1.667v1.666c0 .92.747 1.667 1.667 1.667m-8.333 8.333h1.666c.92 0 1.667-.746 1.667-1.666V10.75c0-.92-.746-1.667-1.667-1.667H2.417c-.92 0-1.667.747-1.667 1.667v1.667c0 .92.746 1.666 1.667 1.666"
    />
  </svg>
);
export default SvgDashboard;
