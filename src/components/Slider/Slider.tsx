import { addCommasToNumber } from "@/utils";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function SliderComponent({ min, max, handleParentChange }) {
  const [val, setVal] = useState<number>(min);
  const marks = [
    {
      value: min,
      label: "",
    },
    {
      value: max,
      label: "",
    },
  ];
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
    handleParentChange(newValue as number);
  };
  return (
    <div>
      <Slider
        marks={marks}
        step={10}
        value={val}
        valueLabelDisplay="off"
        min={min}
        max={max}
        onChange={handleChange}
        sx={{ color: "#001F5C" }}
      />
      <div className="flex justify-between ">
        <p onClick={() => setVal(min)} className="cursor-pointer">
          ₦ {addCommasToNumber(min)}
        </p>
        <p onClick={() => setVal(max)} className="cursor-pointer">
          ₦ {addCommasToNumber(max)} max
        </p>
      </div>
    </div>
  );
}
