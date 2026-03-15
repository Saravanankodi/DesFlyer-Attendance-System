import * as React from "react";
import type { SVGProps } from "react";
const SvgSettings = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.854 1.848c.355-1.464 2.437-1.464 2.792 0a1.437 1.437 0 0 0 2.144.888c1.286-.784 2.758.688 1.974 1.974a1.437 1.437 0 0 0 .888 2.144c1.464.355 1.464 2.437 0 2.792a1.437 1.437 0 0 0-.888 2.144c.784 1.286-.688 2.758-1.974 1.974a1.437 1.437 0 0 0-2.144.888c-.355 1.464-2.437 1.464-2.792 0a1.437 1.437 0 0 0-2.144-.888c-1.286.784-2.758-.688-1.974-1.974a1.437 1.437 0 0 0-.888-2.144c-1.464-.355-1.464-2.437 0-2.792a1.437 1.437 0 0 0 .888-2.144c-.784-1.286.688-2.758 1.974-1.974.831.506 1.914.057 2.144-.888"
    />
    <path
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.75 8.25a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
    />
  </svg>
);
export default SvgSettings;
