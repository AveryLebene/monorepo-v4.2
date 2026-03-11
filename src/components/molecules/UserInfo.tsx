import React from "react";

interface UserInfoProps {
  name: string;
  designation?: string;
  className?: string;
  /** When true, text inherits color from parent (e.g. for dropdown header) */
  inheritColor?: boolean;
}

export default function UserInfo({
  name,
  designation,
  className = "",
  inheritColor = false,
}: Readonly<UserInfoProps>) {
  const textStyle = inheritColor ? undefined : { color: "var(--navbar-text)" };
  return (
    <div className={`flex flex-col ${className}`.trim()}>
      <span className="font-semibold leading-tight" style={textStyle}>
        {name}
      </span>
      {designation != null && designation !== "" && (
        <span className="text-sm opacity-70" style={textStyle}>
          {designation}
        </span>
      )}
    </div>
  );
}
