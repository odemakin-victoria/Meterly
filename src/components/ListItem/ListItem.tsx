import { trimWithEllipses } from "@/utils";
import { IoIosArrowForward } from "react-icons/io";

type ListItemProps = {
  name?: string;
  showArrow?: boolean;
  imgComponent: any;
  subtitleComponent?: any;
  onClick?: (val?: any) => void;
  className?: string;
  endComponent?: any;
  nameComponent?: any;
  noHover?: boolean;
  noTruncate?: boolean;
};

const ListItem = ({
  imgComponent,
  name,
  showArrow,
  subtitleComponent,
  onClick,
  className,
  endComponent,
  nameComponent,
  noHover,
  noTruncate,
}: ListItemProps) => {
  return (
    <div
      className={`flex gap-2 my-2 bg-disabledBg px-3 py-[0.3rem]  justify-between rounded-lg  ${
        !noHover ? "hover:bg-[#311302] hover:text-[#F09A3E] cursor-pointer" : ""
      } group transition-all duration-300 items-center ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {imgComponent}
        <div className="flex flex-col">
          <h1 data-cy="gender-male"
            className={`font-semibold  text-sm md:text-base transition-transform duration-300 group-hover:scale-105 ${
              !noHover ? "group-hover:text-white" : ""
            } `}
          >
            {nameComponent ??
              (noTruncate ? name : trimWithEllipses(name ?? ""))}
          </h1>
          <div
            className={`flex text-[.8rem] gap-1 text-labelBlue ${
              !noHover ? "group-hover:text-white" : ""
            }`}
          >
            {subtitleComponent}
          </div>
        </div>
      </div>
      {onClick && !endComponent && showArrow && (
        <IoIosArrowForward className="text-disabledText" />
      )}
      {endComponent && (
        <span className="font-semibold text-[0.75rem] xl:text-[0.9rem]">
          {endComponent}
        </span>
      )}
    </div>
  );
};

export default ListItem;
