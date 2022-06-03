import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type Option = {
  value: number;
  label: string;
};

type DropdownProps = {
  options: Option[];
  selectedOption: number;
  setSelectedOption: Dispatch<SetStateAction<any>>;
};

/**
 * A custom dropdown component, with ul + li instead of
 * select + option. It makes the styling easier, and the
 * accessibility is handled by aria attributes.
 * Made specifically for the Table component.
 * @param props
 * @constructor
 */
const CustomDropdown = (props: DropdownProps) => {
  const { options, setSelectedOption } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedIndex(index);
    setSelectedOption(options[index].value);
    setIsOptionsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setSelectedThenCloseDropdown(selectedIndex);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(
          selectedIndex - 1 >= 0 ? selectedIndex - 1 : options.length - 1,
        );
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(
          selectedIndex == options.length - 1 ? 0 : selectedIndex + 1,
        );
        break;
      default:
        break;
    }
  };

  return (
    <StyledDropdown>
      <div className={isOptionsOpen ? 'container expanded' : 'container'}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? 'expanded' : ''}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}>
          {options[selectedIndex].label}
        </button>
        <ul
          className={`options ${isOptionsOpen ? 'show' : ''}`}
          role="listbox"
          aria-activedescendant={options[selectedIndex].label}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}>
          {options.map((option, index) => (
            <li
              key={`option-${index}`}
              id={option.label}
              role="option"
              aria-selected={selectedIndex == index}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setSelectedThenCloseDropdown(index);
              }}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </StyledDropdown>
  );
};

export default CustomDropdown;

const StyledDropdown = styled.div`
  position: relative;
  width: 144px;
  
  div.container {
    display: flex;
    flex-direction: column;
    border: 1px solid #bbb;
    background-color: #fff;
    border-radius: 5px 0 0 5px;
    position: absolute;
    z-index: 1;
    overflow: hidden;
    &.expanded {
      border-radius: 5px 0 5px 5px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
  }

  button {
    border: none;
    background-color: transparent;
    width: 144px;
    height: 42px;
    line-height: normal;
    margin: 0;
    padding: 13px 12px;
    text-align: left;
    font-size: 0.85rem;
    position: relative;
  }

  button:hover {
    cursor: pointer;
  }

  button::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    top: 50%;
    transform: translateY(-50%);
    right: 9px;
    background-color: #aaa;
    clip-path: polygon(50% 75%, 0 0, 100% 0);
  }

  button.expanded::after {
    clip-path: polygon(50% 25%, 0% 100%, 100% 100%);
  }

  ul.options {
    display: none;
    flex-direction: column;
    list-style: none;
  }

  ul.show {
    display: flex;
  }

  ul.options li {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  ul.options li:active,
  ul.options li:focus,
  ul.options li:hover,
  ul.options li[aria-selected='true'] {
    background: #eee;
    cursor: pointer;
  }
`;
