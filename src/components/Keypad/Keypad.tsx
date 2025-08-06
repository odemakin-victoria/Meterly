import React, { useState, useRef, useEffect } from "react";

interface PINInputProps {
  length: number;
  onComplete?: (otp: string) => void; // Callback when OTP is complete
  onChange?: (otp: string) => void; // Callback when OTP changes
}

const NumPad: React.FC<PINInputProps> = ({
  length = 4,
  onComplete,
  onChange,
}) => {
  const [otp, setOTP] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (value: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (onChange) {
      onChange(newOTP.join(""));
    }

    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleNumberClick = (digit: string) => {
    const emptyIndex = otp.findIndex((val) => val === "");
    if (emptyIndex !== -1) {
      handleInputChange(digit, emptyIndex);
    }
  };

  const handleDelete = () => {
    const filledIndex = otp.findLastIndex((val) => val !== "");
    if (filledIndex !== -1) {
      handleInputChange("", filledIndex);
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete && onComplete(otp.join(""));
    }
  }, [otp]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-4">
        {otp.map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="password"
            value={otp[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            maxLength={1}
            className="mx-2 w-12 h-12 text-center rounded-md border-2 border-disabledBGBorder bg-disabledBg text-primary"
            style={{ fontFamily: "monospace", fontSize: "1.5rem" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="text-primary border-2 border-primary font-bold py-2 px-4 rounded-full w-16 h-16"
          >
            {number}
          </button>
        ))}

        <div></div>

        <button
          onClick={() => handleNumberClick("0")}
          className="text-primary border-2 border-primary font-bold py-2 px-4 rounded-full w-16 h-16"
        >
          0
        </button>

        <button
          onClick={handleDelete}
          className="border-2 border-red-500 text-black font-bold py-2 px-4 rounded-full w-16 h-16"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default NumPad;
