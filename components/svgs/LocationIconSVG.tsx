import React from "react";

type Props = {
  className?: string;
};

export default function LocationIconSvg({className = "size-5"}:Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill="#F8BF12"
        d="M10 9.583a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166m0-7.916A5.833 5.833 0 0 0 4.167 7.5C4.167 11.875 10 18.333 10 18.333s5.833-6.458 5.833-10.833A5.834 5.834 0 0 0 10 1.667"
      ></path>
    </svg>
  );
}
