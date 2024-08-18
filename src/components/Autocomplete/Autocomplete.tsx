import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';

type AutocompleteProps = {
  options: string[];
};

export const Autocomplete = forwardRef(
  ({ options }: AutocompleteProps, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
    const listRef = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => inputRef.current?.value || '',
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (inputRef.current) {
        inputRef.current.value = value;
      }
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
          if (inputRef.current) {
            inputRef.current.value = filteredOptions[activeOptionIndex];
          }
        } else if (filteredOptions.length > 0) {
          if (inputRef.current) {
            inputRef.current.value = filteredOptions[0];
          }
        }
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOptionClick = (option: string) => {
      if (inputRef.current) {
        inputRef.current.value = option;
      }
      setIsOpen(false);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!listRef.current?.contains(e.relatedTarget as Node)) {
        if (filteredOptions.length > 0) {
          if (inputRef.current) {
            inputRef.current.value = filteredOptions[0];
          }
        }
        setIsOpen(false);
      }
    };

    return (
      <div className='autocomplete'>
        <input
          ref={inputRef}
          type='text'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          className='input-field'
          placeholder='Choose your country'
        />
        {isOpen && (
          <ul ref={listRef} className='options-list'>
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
  },
);
