import React from "react";

interface BrandLogoProps {
  imgSrc: string;
  label?: string;
  direction?: "row" | "column";
  width?: number;
  height?: number;
}

const BrandLogo = ({
  imgSrc,
  label,
  direction = "column",
  width = 72,
  height = 72,
}: BrandLogoProps) => {
  return (
    <div
      className={`flex items-center gap-2  ${
        direction === "column" ? "flex-col" : "flex-row"
      }`}
    >
      <img
        src={imgSrc}
        alt={label || "icon"}
        className=""
        width={width}
        height={height}
      />
      {label && <span className="text-lg font-bold">{label}</span>}
    </div>
  );
};

export default BrandLogo;
