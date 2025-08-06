import { useEffect, useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import { IoIosArrowDown } from "react-icons/io";
import Spinner from "../Spinner/Spinner";
import Image from "next/image";
import Search from "../Search/Search";

export type ListItem = { [key: string]: string | any };
export type DropdownProps = {
  parentClassName?: React.HTMLAttributes<HTMLInputElement>["className"];
  list: ListItem[];
  hasSearch?: boolean;
  disabled?: boolean;
	isRequired?: boolean;
  isLoading?: boolean;
  fetchErrorMessage?: string;
  refetchFxn?: () => void;
  showArrow?: boolean;
  imgParam?: string;
  nameParam: string;
  subtitleParam?: string;
  endParam?: string;
  placeholder?: string;
  label?: any;
  labelClassname?: string;
  dropdownClassName?: string;
  errortxt?: string;
  infotxt?: string;
  successtxt?: string;
  defaultItem?: ListItem;
  onValChange?: (val: ListItem) => void;
  noTruncate?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Dropdown = ({
  list,
  disabled,
  isLoading,
  fetchErrorMessage,
	isRequired,
  showArrow,
  defaultItem,
  subtitleParam,
  endParam,
  placeholder,
  label,
  labelClassname,
  onValChange,
  imgParam,
  nameParam,
  parentClassName,
  dropdownClassName,
  hasSearch,
  noTruncate,
  refetchFxn,
}: DropdownProps) => {
  const scrollRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const [searchQuery, setSearchQuery] = useState("");

	const handleSelectItem = (val: any) => {
    setSelectedItem({
      ...val,
      value: (
        <span className="font-semibold whitespace-nowrap">
          {val[nameParam] || placeholder}
        </span>
      ),
    });
    setShow(false);
    onValChange && onValChange(val);
  };

  useEffect(() => {
    defaultItem && handleSelectItem(defaultItem);
  }, []);

  // Filter the list based on the search query
  const filteredList = searchQuery
    ? list.filter((item) =>
        item[nameParam]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : list;

  return (
    <div
      className="relative content-center w-full"
      onClick={() => (disabled ? setShow(false) : undefined)}
    >
      {show && (
        <div
          className="fixed top-0 bottom-0 right-0 left-0 z-[1]"
          onClick={() => setShow(false)}
        />
      )}
      <h1
        className={`text-[#935F43]   ${labelClassname} mt-2 text-[0.85rem] xss:text-[1rem] font-semibold`}
      >
        {label}
      </h1>
      <div
        className={`flex border rounded-[2px] bg-white  border-[#FEF2EC] px-2 justify-between items-center cursor-pointer ${parentClassName} ${
          selectedItem && imgParam ? "!py-[0.5rem]" : "!py-4"
        }`}
        onClick={() => setShow((prev) => !prev)}
      >
        {selectedItem ? (
          <>
            {imgParam && (
              <Image
                alt="select-icon"
                src={selectedItem[imgParam] ?? ""}
                className="p-1 rounded-full h-[35px] w-[35px] "
                width={35}
                height={35}
              />
            )}
            <div className="text-[0.8rem] text-orange-500 w-full flex flex-col justify-between px-3 lg1:flex-row">
              {selectedItem.value}
            </div>
          </>
        ) : (
          <p className="text-darkGrayText ">
            {placeholder}
          </p>
        )}
        <IoIosArrowDown  className="text-[#F09A3E]"/>
      </div>
      {show && (
        <div
          className={`bg-white absolute left-0 mt-2 py-3 px-5 shadow-2xl rounded-lg w-full z-10 overflow-y-scroll ${
            filteredList.length > 5 ? "h-[470px]" : "h-auto"
          } ${dropdownClassName}`}
        >
          <div className="flex justify-between items-center">
            {placeholder && (
              <h1 className="text-[#311302] font-bold">{placeholder}</h1>
            )}
            <button
              className="font-bold text-grayText"
              onClick={() => setShow(false)}
              type="button"
              ref={scrollRef}
            >
              X
            </button>
          </div>
          {hasSearch && (
            <Search searchValue={searchQuery} setSearchValue={setSearchQuery} />
          )}
          {isLoading && !filteredList.length ? (
            <Spinner className="my-20" />
          ) : !isLoading && !filteredList.length ? (
            <p className="my-20 text-center font-bold text-borderRed flex flex-col items-center justify-center">
              {fetchErrorMessage ?? "Nothing found"}
              {refetchFxn && (
                <button
                  className="bg-[#935F43] text-white px-5 py-2 mt-5 rounded-lg"
                  onClick={() => refetchFxn && refetchFxn()}
                >
                  Retry
                </button>
              )}
            </p>
          ) : (
            filteredList.map((li, index) => (
              <ListItem
                key={`${li.name}-${index}`}
                className="!py-2 text-[#935F43]"
                imgComponent={
                  imgParam &&
                  typeof li[imgParam as keyof ListItem] === "string" ? (
                    <Image
                      src={li[imgParam as keyof ListItem] ?? ""}
                      alt="logo"
                      className="rounded-full m-auto h-[25px] w-[25px]"
                      width={25}
                      height={25}
                    />
                  ) : null
                }
                name={li[nameParam as keyof ListItem]}
                subtitleComponent={
                  subtitleParam ? (
                    <span>{li[subtitleParam as keyof ListItem]}</span>
                  ) : null
                }
                endComponent={
                  endParam && endParam.toLowerCase() === "amount"
                    ? `N${li[endParam as keyof ListItem]}`
                    : endParam
                    ? li[endParam as keyof ListItem]
                    : null
                }
                showArrow={showArrow}
                onClick={() => handleSelectItem(li)}
                noTruncate={noTruncate}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
