import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  title?: string | React.ReactElement;
  icon?: React.ReactElement;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Button({
  title = "",
  icon,
  onClick,
  type = "button",
  disabled = false,
  style,
  className,
}: ButtonProps) {
  className = twMerge(
    `${
      disabled ? "bg-opacity-[0.3] bg-primary" : "bg-primary hover:bg-color2"
    }  rounded-md  text-white flex justify-center items-center shadow-[0_5.314606666564941px_5.314606666564941px_#00000040]  p-2   font-bold text-sm transition-all ease-in duration-300  ${
      !disabled ? "cursor-pointer" : "cursor-not-allowed"
    } ${className}`
  );

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      style={style}
      className={className}
    >
      {icon} {icon && "\u00A0"}{" "}
      {typeof title == "string" ? <span>{title}</span> : title}
    </button>
  );
}
