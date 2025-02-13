import { cn } from "@/lib/utils";

const FrontIcon = ({ className }: React.SVGAttributes<HTMLOrSVGElement>) => {
    return (
        <svg
            className={cn("fill-current", className && className)}
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_275_269)">
                <path
                    d="M13.4701 4.47173C13.7305 4.21138 13.7305 3.78927 13.4701 3.52892L10.8034 0.862254C10.5431 0.601905 10.121 0.601905 9.86063 0.862254C9.60028 1.1226 9.60028 1.54471 9.86063 1.80506L11.3892 3.33366L0.998698 3.33366C0.630508 3.33366 0.332031 3.63214 0.332031 4.00033C0.332031 4.36852 0.630508 4.66699 0.998698 4.66699L11.3892 4.66699L9.86063 6.19559C9.60028 6.45594 9.60028 6.87805 9.86063 7.1384C10.121 7.39875 10.5431 7.39875 10.8034 7.1384L13.4701 4.47173Z"
                    fill="#010005"
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

export { FrontIcon };
