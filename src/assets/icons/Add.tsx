import type { SVGProps } from "react";
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.667 10.833V5c0-.92-.747-1.667-1.667-1.667H5c-.92 0-1.667.747-1.667 1.667v5.833m13.334 0V15c0 .92-.747 1.667-1.667 1.667H5c-.92 0-1.667-.747-1.667-1.667v-4.167m13.334 0h-2.155a.83.83 0 0 0-.59.244l-2.011 2.012a.83.83 0 0 1-.59.244H8.678a.83.83 0 0 1-.589-.244l-2.012-2.012a.83.83 0 0 0-.589-.244H3.333"
    />
  </svg>
);
export default SvgAdd;
