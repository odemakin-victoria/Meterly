// FilterCalendar.tsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Define the interface for the props
interface FilterCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
}

const FilterCalendar: React.FC<FilterCalendarProps> = ({ isOpen, onClose, onDateSelect }) => {
  const [viewType, setViewType] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleViewChange = (type: string) => setViewType(type);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) onDateSelect(date);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#003399] bg-opacity-75">
      <div
        className="bg-white rounded-lg p-6 relative"
        style={{ width: "393px", height: "552px" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filter Period</h3>
          <button onClick={onClose} className="text-lg font-semibold">✕</button>
        </div>

        {selectedDate && (
          <div className="text-left text-[#039] font-semibold mb-4">
            Selected Date: {selectedDate.toDateString()}
          </div>
        )}

        {/* Toggle Buttons for Weekly, Monthly, Yearly */}
        <div className="flex space-x-2 mb-4">
          {["weekly", "monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => handleViewChange(type)}
              className={`px-4 py-2 rounded-lg shadow-lg ${
                viewType === type ? "bg-[#039] text-white" : "bg-white text-[#039]"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Calendar View */}
        <div className="p-4 rounded-lg" style={{ border: "none" }}>
          {viewType === "weekly" && (
            <Calendar
              view="month"
              onClickDay={(value) => handleDateSelect(value)}
              tileClassName={({ date, view }) =>
                selectedDate?.toDateString() === date.toDateString() ? "highlighted-date" : ""
              }
            />
          )}
          {viewType === "monthly" && (
            <Calendar
              view="year"
              onClickMonth={(value) => handleDateSelect(value)}
              tileClassName={({ date, view }) =>
                selectedDate?.toDateString() === date.toDateString() ? "highlighted-date" : ""
              }
            />
          )}
          {viewType === "yearly" && (
            <Calendar
              view="decade"
              onClickYear={(value) => handleDateSelect(value)}
              tileClassName={({ date, view }) =>
                selectedDate?.toDateString() === date.toDateString() ? "highlighted-date" : ""
              }
            />
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-[#039] text-white px-4 py-2 rounded-lg font-semibold"
        >
          Done
        </button>
      </div>

      {/* Add custom CSS for calendar styling */}
      <style jsx global>{`
        .react-calendar {
          border: none;
          width: 100%;
        }
        .highlighted-date {
          background-color: #039 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default FilterCalendar;
