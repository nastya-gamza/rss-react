import React, { useState } from 'react';

type AutocompleteProps = {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export const ControlledAutocomplete = ({
  options,
  value,
  onChange,
  onBlur,
}: AutocompleteProps) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(e);
    const newFilteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(newFilteredOptions);
    setIsOpen(true);
    setActiveOptionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveOptionIndex(
        (prevIndex) => (prevIndex + 1) % filteredOptions.length,
      );
    } else if (e.key === 'ArrowUp') {
      setActiveOptionIndex((prevIndex) =>
        prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1,
      );
    } else if (e.key === 'Enter') {
      if (activeOptionIndex >= 0) {
        onChange({
          target: { value: filteredOptions[activeOptionIndex] },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (filteredOptions.length > 0) {
        onChange({
          target: { value: filteredOptions[0] },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: string) => {
    onChange({
      target: { value: option },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={onBlur}
        className='input-field'
        placeholder='Choose your country'
      />
      {isOpen && (
        <ul className='options-list'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={index === activeOptionIndex ? 'active' : ''}
                tabIndex={-1}
              >
                {option}
              </li>
            ))
          ) : (
            <li className='no-options'>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};
