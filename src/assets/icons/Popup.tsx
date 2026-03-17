import type { SVGProps } from "react";
const SvgPopup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#008A2E"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8-.001 8 8 0 0 0 8 16m3.857-9.809a.75.75 0 1 0-1.214-.882l-3.483 4.79-1.88-1.88A.75.75 0 1 0 4.22 9.28l2.5 2.5a.75.75 0 0 0 1.137-.089z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPopup;
