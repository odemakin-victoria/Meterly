import React, { useState, useRef, useEffect } from "react";
import Spinner from "../Spinner/Spinner";

interface OTPInputProps {
  resendFxn?: () => void;
  length: number; // Number of OTP digits
  onComplete: (otp: string) => void; // Callback when OTP is complete
  resendSuccess?: boolean;
  resendError?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  resendFxn,
  resendSuccess,
  resendError,
}) => {
  const [otp, setOTP] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [counter, setCounter] = useState<number>(30);
  const [isResending, setIsResending] = useState(false);
  const [isResent, setIsResent] = useState(false);

  const handleInputChange = (value: string, index: number) => {
    // Allow only numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    const newOTP = [...otp];
    newOTP[index] = numericValue;
    setOTP(newOTP);

    // Move to the next input
    if (numericValue !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text/plain");
    const pastedDigits = clipboardData
      .split("")
      .filter((char) => /^[0-9]$/.test(char)) // Filter only numeric characters
      .slice(0, length);

    const newOTP = [...otp];
    pastedDigits.forEach((digit, i) => {
      if (inputRefs.current[index + i]) {
        newOTP[index + i] = digit;
        inputRefs.current[index + i].value = digit;
      }
    });
    setOTP(newOTP);
    inputRefs.current[index + pastedDigits.length]?.focus();
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
      nextInput.setSelectionRange(length, length); // M
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      resendFxn && (await resendFxn()); // Ensure resendFxn returns a promise
    } catch (error) {
      console.error("Error resending OTP", error);
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete(otp.join(""));
    }
  }, [otp]);

  useEffect(() => {
    // Start a new interval when the counter changes and is greater than 0
    if (counter > 0) {
      const intervalId = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup the interval when the component unmounts or when counter changes
      return () => clearInterval(intervalId);
    }
  }, [counter]);

  useEffect(() => {
    setIsResending(false);

    if (resendSuccess) {
      setIsResent(true);
      setTimeout(() => {
        setIsResent(false);
        setCounter(30);
      }, 3000);
    }
  }, [resendSuccess]);
  useEffect(() => {
    setIsResending(false);
    setCounter(30);
  }, [resendError]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center flex-wrap">
        {otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
              type="password" // Mask the input value
              autoFocus={index === 0}
              value={otp[index]} // Display asterisks
              onChange={(e) => handleInputChange(e.target.value, index)} // Use onInput for more control
              onPaste={(e) => handlePaste(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="primary inline-block mx-1 my-2 w-10 h-10 px-3 text-center rounded-lg border-2 border-[#FEF2EC] bg-[#FEF2EC] text-[#311302]"
              style={{
                fontFamily: "monospace",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="my-4 text-[#311302] font-normal">
        {resendError ? (
          <p className="bg-lightred border border-borderRed p-2 rounded-lg animate-slideIn text-black">
            {resendError}
          </p>
        ) : isResending ? (
          <Spinner />
        ) : isResent ? (
          <p className="bg-lightgreen border border-primaryGreen p-2 rounded-lg animate-slideIn">
            OTP resent successfully
          </p>
        ) : (
          resendFxn && (
            <>
              Didn't get an OTP?{" "}
              <button
                disabled={counter > 0}
                onClick={() => handleResendOTP()}
                className={`${
                  counter > 0
                    ? "text-[#935F43] "
                    : "text-grey  cursor-pointer "
                } underline mx-1 mr-2`}
                type="button"
              >
                Resend
              </button>
              (00:{counter < 10 ? `0${counter}` : counter}){" "}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default OTPInput;
