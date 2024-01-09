/* eslint-disable react/prop-types */

const RangeInput = ({ value, min, max, onChange,className }) => {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className={`w-full h-1 rounded-full appearance-none ${className}`}
    />
  );
};

export default RangeInput;
