import React from "react";

interface ProgressBarProps {
  progress: number; // The progress should be a number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const circleSize = 30; // Width and height of the circle
  const strokeWidth = 5; // Thickness of the circle
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={circleSize}
      height={circleSize}
      className="progress-bar"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Background Circle */}
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        fill="none"
        stroke="#E6EBF5"
        strokeWidth={strokeWidth}
      />
      {/* Foreground Circle (Progress) */}
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        fill="none"
        stroke="#0DDE65"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
      />
      {/* Text displaying the percentage */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="10px"
        fill="#001F5C"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressBar;
