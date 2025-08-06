import React, { useState } from "react";
import lockSvg from "../../../public/assets/images/lock.svg";
import eyeSvg from "../../../public/assets/images/eye.svg";
import crosseyeSvg from "../../../public/assets/images/crosseye.svg";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export type InputProps = {
  lefticon?: JSX.Element;
  righticon?: JSX.Element;
  leftIconClassName?: string;
  rightIconClassName?: string;
  labelClassName?: string;
  errortxt?: string;
  infotxt?: string;
  successtxt?: string;
  label?: string;
  lefticonClick?: () => void;
  righticonClick?: () => void;
  inputClassName?: React.HTMLAttributes<HTMLInputElement>["className"];
  parentClassName?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: InputProps): JSX.Element {
  const [showpass, setShowPass] = useState(false);
  const returnLeftIcon = () => {
    if (props.type == "password") {
      return (
        <button
          className="outline-none ml-2"
          type="button"
          onClick={props.lefticonClick}
        >
          <Image src={lockSvg} className="object-cover object-center w-5" alt="password icon"/>
        </button>
      );
    }
    if (props.lefticon) {
      return (
        <button
          className={`outline-none ${props.leftIconClassName}`}
          type="button"
          onClick={props.lefticonClick}
        >
          {props.lefticon}
        </button>
      );
    }
    return null;
  };

  const returnRightIcon = () => {
    if (props.type == "password") {
      return (
        <button
          className="outline-none ml-4 mr-4"
          onClick={() => setShowPass((val) => !val)}
          type="button"
        >
          {showpass ? (
            <Image src={crosseyeSvg} className="object-fill object-center w-6" alt="password eye closed"/>
          ) : (
            <Image src={eyeSvg} className="object-fill object-center w-6" alt="password eye"/>
          )}
        </button>
      );
    }
    if (props.righticon) {
      return (
        <button
          className="outline-none ml-4 mr-4"
          onClick={props.righticonClick}
          type="button"
        >
          {props.righticon}
        </button>
      );
    }
    return null;
  };

  const returnInputType = () => {
    if (props.type == "password") {
      return showpass ? "text" : "password";
    }
    return props.type;
  };

  const returnInputStyle = () => {
    if (props.errortxt) {
      return "border-2 border-red-500 hover:border-red-500 focus-within:border-red-500";
    }
    if (props.successtxt) {
      return "border-2 border-color2 hover:border-color2 focus-within:border-color2";
    }
    return "";
  };

  const renderStatusText = () => {
    if (props.errortxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-red-500">
          {props.errortxt}
        </span>
      );
    }

    if (props.successtxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-color2">
          {props.successtxt}
        </span>
      );
    }

    if (props.infotxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-green-600">
          {props.infotxt}
        </span>
      );
    }
  };
  let className = twMerge(
    `border-green-800 border border-[#FEF2EC] flex  w-full h-[49.23px] rounded-lg overflow-hidden items-center bg-white transition-all ${
      props.className
    } ${returnInputStyle()} `
  );
  return (
    <div className={`${props.parentClassName} `}>
      {props.label && (
        <p
          className={`text-[#935F43]  font-semibold ${props.labelClassName} text-[0.85rem] xss:text-[1rem]`}
        >
          {props.label}
        </p>
      )}
      <div className={className}>
        {returnLeftIcon()}

        <input
          className={`bg-inherit w-full ${
            props.lefticon ? "ml-[0.8rem]" : "pl-[0.8rem]"
          } h-full outline-0 border-0  rounded-2xl placeholder:text-color4 placeholder:leading-4  font-normal relative placeholder:text-[0.5rem]  sm1:placeholder:text-[0.8rem] placeholder:font-normal  ${
            props.inputClassName
          } `}
          placeholder={props.placeholder || "Placeholder"}
          type={returnInputType()}
          name={props.name || ""}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          minLength={props.minLength}
          min={props.min}
          pattern={props.pattern}
          readOnly={props.readOnly}
          max={props.max}
          maxLength={props.maxLength}
          value={props.value}
          onChange={props.onChange}
          required={props.required || false}
        />
        {returnRightIcon()}
      </div>
      {renderStatusText()}
    </div>
  );
}
