import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import Image from "next/image";
import filterIcon from "../../../public/assets/images/filterIcon.svg";

type SearchProps = {
  placeholder?: string;
  parentClassName?: string;
  inputClassName?: string;
  endIcon?: any;
  searchValue: string;
  setSearchValue: (val: string) => void;
};

const Search = ({
  placeholder = "Search",
  parentClassName,
  inputClassName,
  endIcon,
  searchValue,
  setSearchValue,
}: SearchProps) => {
  return (
    <div
      className={`border border-[#FABF9E] rounded-lg flex items-center ${parentClassName}`}
    >
      {/* Search Icon on the left with styling */}
      <div
        className="bg-[#FEEFE7] w-[50px] h-[45px] rounded-xl flex items-center justify-center p-1"
        style={{
          borderLeft: "1px solid transparent",
          borderTop: "1px solid transparent",
          borderBottom: "1px solid transparent",
          gap: "10px",
          opacity: 0.9,
        }}
      >
        <IoSearchSharp className="text-[#EA5B0C]" />
      </div>

      {/* Input field taking 70% width on larger screens */}
      <input
        placeholder={placeholder}
        className={`w-[70%] flex-1 pl-3 ${inputClassName} md:w-[70%] sm:w-full`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* Filter icon at the end */}
      <span className="cursor-pointer ml-2 pr-5">
        <Image src={filterIcon} alt="Filter Icon" width={24} height={24} />
      </span>
    </div>
  );
};

export default Search;
