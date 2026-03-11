import React from "react";

interface BrandLogoProps {
  imgSrc: string;
  label?: string;
  direction?: "row" | "column";
  width?: number;
  height?: number;
  border?: boolean;
}

const BrandLogo = ({
  imgSrc,
  label,
  direction = "column",
  border = false,
  width = 72,
  height = 72,
}: BrandLogoProps) => {
  const borderClass = border
    ? direction === "column"
      ? "border-l border-white/20"
      : "border-b border-white/20"
    : "";

  return (
    <div
      className={`flex items-center gap-2 ${
        direction === "column" ? "flex-col" : "flex-row"
      } ${borderClass}`}
    >
      <img src={imgSrc} alt={label || "icon"} width={width} height={height} />
      {label && (
        <span className="text-sm font-semibold text-white text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
