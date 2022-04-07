import React from 'react';
import { Dispatch, SetStateAction } from 'react';

type Option = {
  value: number | string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  selectedOption: number | string;
  setSelectedOption: Dispatch<SetStateAction<any>>;
};

const Dropdown = (props: DropdownProps) => {
  const { options, selectedOption, setSelectedOption } = props;
  return (
    <select
      id='pagination'
      value={selectedOption}
      onChange={(e) => setSelectedOption(+e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;