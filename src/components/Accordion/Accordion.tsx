import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface AccordionProps {
  items: { title: string; content: string }[];
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`w-full  ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full px-4 py-2 text-left text-lg font-medium bg-disabledBg hover:bg-gray-300"
          >
            {item.title}
            <span>
              {activeIndex === index ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-4 py-2 text-gray-700 bg-gray-100 text-[0.9rem] transition-all duration-300 fade-in ">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
