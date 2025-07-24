import { cn } from "@/lib/utils";
import React from "react";

const BackIcon = ({ className }: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      className={cn("fill-current", className && className)}
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_275_269)">
        <path
          d="M0.912046 5.58942C0.58661 5.26398 0.58661 4.73634 0.912046 4.41091L4.24538 1.07757C4.57082 0.752137 5.09845 0.752137 5.42389 1.07757C5.74933 1.40301 5.74933 1.93065 5.42389 2.25609L3.51315 4.16683L16.5013 4.16683C16.9615 4.16683 17.3346 4.53993 17.3346 5.00016C17.3346 5.4604 16.9615 5.8335 16.5013 5.8335L3.51315 5.8335L5.42389 7.74424C5.74933 8.06968 5.74933 8.59732 5.42389 8.92275C5.09845 9.24819 4.57082 9.24819 4.24538 8.92275L0.912046 5.58942Z"
          fill="#171717"
        />
      </g>
      <defs>
        <clipPath id="clip0_275_269">
          <rect width="30" height="30" />
        </clipPath>
      </defs>
    </svg>
  );
};

export { BackIcon };
