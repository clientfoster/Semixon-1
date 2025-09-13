import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      width="120"
      height="30"
      {...props}
    >
      <text
        x="10"
        y="28"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        className="fill-primary"
      >
        Semixon
        <tspan fill="hsl(var(--accent))" className="fill-accent"> Lite</tspan>
      </text>
    </svg>
  );
}
