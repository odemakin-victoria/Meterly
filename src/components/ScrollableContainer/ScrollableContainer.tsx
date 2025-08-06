import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
 
const ScrollableContainer = ({ items, noOfItems }) => {
  const itemsPerPage = noOfItems;
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const containerRef = useRef<HTMLDivElement>(null);
 
  // Scroll the container to the next/previous set of items
  const scrollTo = (index: number) => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: scrollWidth * (index / itemsPerPage),
        behavior: "smooth",
      });
    }
  };
 
  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
      scrollTo(currentIndex - itemsPerPage);
    }
  };
 
  const scrollRight = () => {
    if (currentIndex + itemsPerPage < items.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
      scrollTo(currentIndex + itemsPerPage);
    }
  };
 
  return (
    <div className="flex items-center space-x-4  w-full 0">
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          className="text-white p-2 rounded-full bg-primary cursor-pointer"
          style={{ boxShadow: "1px 1px 7px #0DDE65" }}
        >
          <FaArrowLeft size={25} className="p-1 " />
        </button>
      )}
 
      <div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items}
      </div>
      {currentIndex + itemsPerPage < items.length && (
        <button
          onClick={scrollRight}
          className="text-white p-2 rounded-full bg-primary cursor-pointer"
          style={{ boxShadow: "1px 1px 7px #0DDE65" }}
        >
          <FaArrowRight size={25} className="p-1 " />
        </button>
      )}
    </div>
  );
};
 
export default ScrollableContainer;