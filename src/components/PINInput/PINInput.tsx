import React, { useState, useRef, useEffect } from "react";

interface PINInputProps {
  length: number;
  onComplete?: (otp: string) => void; // Callback when OTP is complete
  onChange?: (otp: string) => void; // Callback when OTP changes
}

const PINInput: React.FC<PINInputProps> = ({
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

    // Trigger the onChange prop when OTP changes
    if (onChange) {
      onChange(newOTP.join(""));
    }

    // Move to the next input
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text/plain");
    const pastedDigits = clipboardData.split("").slice(0, length);

    const newOTP = [...otp];
    pastedDigits.forEach((digit, i) => {
      if (inputRefs.current[index + i]) {
        newOTP[index + i] = digit;
        inputRefs.current[index + i].value = digit;
      }
    });
    setOTP(newOTP);
    inputRefs.current[index + pastedDigits.length]?.focus();

    // Trigger the onChange prop when OTP changes
    if (onChange) {
      onChange(newOTP.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Clear the current input and move the cursor to the end of the previous one
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);

      const prevInput = inputRefs.current[index - 1];
      prevInput.focus();

      // Delay setting the selection range to ensure it works as expected
      requestAnimationFrame(() => {
        prevInput.setSelectionRange(
          prevInput.value.length,
          prevInput.value.length
        );
      });

      // Trigger the onChange prop when OTP changes
      if (onChange) {
        onChange(newOTP.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to the previous input and move the cursor to the end
      const prevInput = inputRefs.current[index - 1];
      prevInput.focus();

      // Delay setting the selection range to ensure it works as expected
      requestAnimationFrame(() => {
        prevInput.setSelectionRange(
          prevInput.value.length,
          prevInput.value.length
        );
      });
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move to the next input and move the cursor to the back
      const nextIndex = index + 1;
      const nextInput = inputRefs.current[nextIndex];
      nextInput.focus();
      const length = nextInput.value.length;
      nextInput.setSelectionRange(length, length);
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete && onComplete(otp.join(""));
    }
  }, [otp]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center flex-wrap">
        {otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="password" // Mask the input value
              autoFocus={index === 0}
              value={otp[index]} // Display asterisks
              onChange={(e) => handleInputChange(e.target.value, index)}
              onPaste={(e) => handlePaste(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="primary inline-block mx-2 my-2 w-12 h-12 px-2 text-center rounded-md border-2 border-disabledBGBorder bg-disabledBg text-primary"
              style={{
                fontFamily: "monospace",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PINInput;
