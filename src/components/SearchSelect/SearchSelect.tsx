import React, { useState, useRef } from "react";
import Button from "../Button/Button";

interface Option {
  value: string;
  label: string;
}

interface SearchSelectProps {
  options: Option[];
  inputPlaceHolder?: string;
  placeholder?: string;
  onSelect: (selectedOption: Option | null) => void;
  onRetry?: () => void;
  hideinput?: boolean;
  loading?: boolean;
  error?: string;
  val?: string;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  onSelect,
  inputPlaceHolder = "Search...",
  placeholder,
  hideinput = false,
  loading = false,
  onRetry,
  val = "",
  error = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(val);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    onSelect(option);
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4">
      <div ref={dropdownRef} className="relative inline-block w-full">
        <div
          className={`flex justify-between items-center drop-shadow-md min-h-[50.23px] bg-white ${
            error && "border border-red-500"
          } rounded-md p-2 cursor-pointer`}
          onClick={toggleDropdown}
        >
          <span>
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : placeholder || "Select an option"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full  bg-white rounded-md shadow-lg top-14">
            {!hideinput && (
              <input
                ref={inputRef}
                type="text"
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                placeholder={inputPlaceHolder}
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            )}
            {renderList()}
          </div>
        )}
      </div>
      {error && <div className="text-red-500 mt-1 ml-1">{error}</div>}
    </div>
  );

  function renderList() {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-4">
          <span className="text-red-500 mt-1 ml-1">{error}</span>
          {onRetry && (
            <Button
              title={"Retry"}
              onClick={onRetry}
              className="text-white mt-2 shadow-none min-h-[35px]"
            />
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center py-4">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
            />
          </svg>
        </div>
      );
    }

    return (
      <ul className="py-1 max-h-48 overflow-y-auto">
        {filteredOptions.map((option, index) => (
          <li
            key={String(index)}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              option.value === selectedValue ? "bg-gray-200" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
  }
};

export default SearchSelect;
