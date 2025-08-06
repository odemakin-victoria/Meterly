import React, { useState, useEffect } from "react";

type ListItem = { key: string; value: string };
export type SelectProps = {
  parentClassName?: React.HTMLAttributes<HTMLInputElement>["className"];
  list?: ListItem[];
  label?: string;
  errortxt?: string;
  infotxt?: string;
  successtxt?: string;
  defaultItem?: ListItem;
  onValChange?: (val: ListItem) => void;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Select({
  title = "Dropdown",
  label,
  className,
  errortxt = "",
  infotxt = "",
  successtxt = "",
  defaultItem = {
    key: "",
    value: "",
  },
  list,
  parentClassName,
  onValChange,
}: SelectProps) {
  const [showdropdown, setShowDropDown] = useState(false);
  const [selecteditem, setSelectedItem] = useState<ListItem>(defaultItem);

  useEffect(() => {
    onValChange && onValChange(selecteditem);
    if (selecteditem) {
      setShowDropDown(false);
    }
  }, [selecteditem]);

  useEffect(() => {
    if (defaultItem && defaultItem.key !== selecteditem.key) {
      setSelectedItem(defaultItem);
    }
  }, [defaultItem]);
  const renderStatusText = () => {
    if (errortxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-red-500">
          {errortxt}
        </span>
      );
    }

    if (successtxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-color1">
          {successtxt}
        </span>
      );
    }

    if (infotxt) {
      return (
        <span className="font-inter text-sm font-bold leading-4 text-primary">
          {infotxt}
        </span>
      );
    }
  };

  const returnSelectStyle = () => {
    if (errortxt) {
      return "border-2 border-red-500 hover:border-red-500 focus-within:border-red-500";
    }

    if (successtxt) {
      return "border-2 border-color2 hover:border-color2 focus-within:border-color2";
    }

    return "";
  };

  const renderList = () => {
    if (!list || list.length < 1) {
      return (
        <span
          className={`text-sm leading-4 py-2 text-[#000] text-center font-bold inline-block w-full
          `}
        >
          Empty List
        </span>
      );
    }

    return list.map((item, index) => {
      if (selecteditem.key == item.key) {
        return (
          <li
            className="cursor-pointer bg-color11 border-r-[5px] border-[#3377FF] mb-1"
            key={index.toString()}
            onClick={() => setSelectedItem(item)}
          >
            <span className="block px-4 py-2 text-color4 font-bold ">
              {item.key}
            </span>
          </li>
        );
      }

      return (
        <li
          className="cursor-pointer hover:bg-color11 mb-1"
          key={index.toString()}
          onClick={() => setSelectedItem(item)}
        >
          <span className="block px-4 py-2 font-normal text-[#000]">
            {item.key}
          </span>
        </li>
      );
    });
  };

  return (
    <div className={`relative text-[#00143D] my- ${parentClassName}`}>
      {label}
      <div
        className={`bg-white h-[50.23px] px-2  cursor-pointer flex items-center justify-between ${className} ${returnSelectStyle()}`}
        onClick={() => {
          setShowDropDown(!showdropdown);
        }}
      >
        <span
          className={`text-[0.85rem] xss:text-[1rem] leading-4 text-left ml-2  ${
            selecteditem.key ? " text-xs text-[#00143D]" : "text-color4"
          }`}
        >
          {selecteditem.key || title}
        </span>
        <svg
          className={`w-4 h-4 ml-2`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-color4"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div
        className={`z-10 absolute border border-gray-100 top-[102%] ${
          !showdropdown && "hidden"
        } bg-white divide-y h-fit divide-gray-100 shadow-[0_5.314606666564941px_5.314606666564941px_#00000040] w-full`}
      >
        <ul
          className={`${
            list && list.length > 5 ? "overflow-y-scroll h-[200px]" : ""
          } py-2 text-sm text-gray-700 `}
          aria-labelledby="dropdownHoverButton"
        >
          {renderList()}
        </ul>
      </div>
      {renderStatusText()}
    </div>
  );
}
