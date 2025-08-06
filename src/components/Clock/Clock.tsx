import React, { useEffect, useState } from "react";
import { currentTime } from "./currentTime";

export type ClockProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export default function Clock({ className }: ClockProps) {
  const [datetime, setDateTime] = useState(
    `${new Date().toDateString()} ${currentTime()}`
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(`${new Date().toDateString()} ${currentTime()}`);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={`leading-4 text-sm text-color5 ${className}`}>{datetime}</div>
  );
}
